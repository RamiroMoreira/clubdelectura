import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Actividades = new Mongo.Collection('actividades');
if (Meteor.isServer) {

Meteor.methods({
  'actividades.insert'(actividad){
    check(actividad.nombre, String);
    check(actividad.inicio, Date);
    check(actividad.dibujo, String);
    var user;
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    else{
      user = Meteor.users.findOne(this.userId);
    }
    Actividades.insert({
      nombre: actividad.nombre,
      inicio: actividad.inicio,
      fin: actividad.fin,
      texto: actividad.texto,
      dateCreated: new Date(),
      createdBy: user.username,
      dibujo: actividad.dibujo,
      colaboradores: actividad.colaboradores,
      fotos: actividad.fotos
    });
  },
  'actividades.update'(actividad){
    check(actividad.nombre, String);
    // check(actividad.inicio, Date);
    var user;
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    else{
      user = Meteor.users.findOne(this.userId);

    }
    Actividades.update({_id: actividad._id},{
      nombre: actividad.nombre,
      inicio: actividad.inicio,
      fin: actividad.fin,
      texto: actividad.texto,
      dibujo: actividad.dibujo,
      colaboradores: actividad.colaboradores,
      fotos: actividad.fotos
    });
  },
  'actividades.remove'(actividadId){
     check(actividadId, String);
     Actividades.remove(actividadId);
  }
})


  // This code only runs on the server
  Meteor.publish('actividades', function actividadesPublication() {
    return Actividades.find({});
  });
}