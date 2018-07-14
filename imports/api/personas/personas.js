import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Personas = new Mongo.Collection('personas');

if (Meteor.isServer) {

Meteor.methods({
  'personas.insert'(){
    // check(actividad.nombre, String);
    // check(actividad.inicio, Date);
    var user;
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    else{
      user = Meteor.users.findOne(this.userId);

    }
    Personas.insert({
      dateCreated: new Date(),
      createdBy: user.username
    });
  },
  'personas.update'(persona){
    check(persona._id, String);
    // check(actividad.inicio, Date);
    var user;
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    else{
      user = Meteor.users.findOne(this.userId);

    }
    Personas.update({_id: persona._id},{$set: {
      nombre: persona.nombre,
      texto: persona.texto,

      }
    });
  },
  'personas.remove'(personaId){
    check(personaId, String);
      if(!this.userId){
          throw new Meteor.Error('not-authorized');
      }
    Personas.remove(personaId);
  },
  'personas.addFoto'(personaId, urlFoto){
      check(personaId, String);
      check(urlFoto, String);
      if(!this.userId){
          throw new Meteor.Error('not-authorized');
      }
      Personas.update({_id: personaId}, {
          $set: {
              urlFoto:urlFoto
          }
      })
  }
})


  // This code only runs on the server
  Meteor.publish('personas', function personasPublication() {
    return Personas.find({},{sort:{nombre:-1}});
  });
}