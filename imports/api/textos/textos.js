import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Textos = new Mongo.Collection('textos');


if (Meteor.isServer) {
Meteor.methods({
  'textos.upsert'(texto, codigo){
    check(texto, String);
    check(codigo, String);
    var user;
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    else{
      user = Meteor.users.findOne(this.userId);

    }
    var oldTexto = Textos.findOne({codigo: codigo})
    if(oldTexto){
      console.log('updating', texto)
      Textos.update({codigo:codigo}, {$set:{texto:texto, autor: user.username}});
    }
    else{
      console.log('inserting')
      Textos.insert({
        codigo: codigo,
        texto: texto,
        autor: user.username
      });
    }

  },
  'textos.addFoto'(textoId, fotoUrl){
      if (! this.userId) {
          throw new Meteor.Error('not-authorized');
      }
      Textos.update({_id:textoId},{$set:{fotoUrl:fotoUrl}});
  }
})



  // This code only runs on the server
  Meteor.publish('textos', function textosPublish() {
    return Textos.find();
  });
}