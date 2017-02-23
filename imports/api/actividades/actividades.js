import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Actividades = new Mongo.Collection('actividades');

Meteor.methods({
  'actividades.insert'(actividad){
    check(actividad.nombre, String);
    check(actividad.inicio, Date);
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
      createdBy: user.username
    });
  },
  'actividades.remove'(actividadId){
     check(actividadId);
     Actividades.remove(actividadId);
  }
})


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('actividades', function actividadesPublication() {
    return Actividades.find();
  });
}