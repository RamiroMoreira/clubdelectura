import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Resenas = new Mongo.Collection('resenas');
if (Meteor.isServer) {
    Meteor.methods({
        // 'resenas.insert'(actividad){
        //     check(actividad.nombre, String);
        //     check(actividad.inicio, Date);
        //     check(actividad.dibujo, String);
        //     var user;
        //     if (! this.userId) {
        //         throw new Meteor.Error('not-authorized');
        //     }
        //     else{
        //         user = Meteor.users.findOne(this.userId);
        //     }
        //     Actividades.insert({
        //         nombre: actividad.nombre,
        //         inicio: actividad.inicio,
        //         fin: actividad.fin,
        //         texto: actividad.texto,
        //         dateCreated: new Date(),
        //         createdBy: user.username,
        //         dibujo: actividad.dibujo,
        //         colaboradores: actividad.colaboradores,
        //         fotos: actividad.fotos
        //     });
        // },
        // 'actividades.update'(actividad){
        //     check(actividad.nombre, String);
        //     // check(actividad.inicio, Date);
        //     var user;
        //     if (! this.userId) {
        //         throw new Meteor.Error('not-authorized');
        //     }
        //     else{
        //         user = Meteor.users.findOne(this.userId);
        //
        //     }
        //     Actividades.update({_id: actividad._id},{
        //         nombre: actividad.nombre,
        //         inicio: actividad.inicio,
        //         fin: actividad.fin,
        //         texto: actividad.texto,
        //         dibujo: actividad.dibujo,
        //         colaboradores: actividad.colaboradores,
        //         fotos: actividad.fotos
        //     });
        // },
        // 'actividades.remove'(actividadId){
        //     check(actividadId, String);
        //     Actividades.remove(actividadId);
        // },
        // getActividadesFuturas(){
        //     var dateNow = new Date();
        //     return Actividades.find({inicio:{$gte:dateNow}}).fetch()
        // },
        // 'getTotalActivities': function(searchString){
        //     var query = {};
        //     if(searchString){
        //         query.$or = [{nombre:{ $regex: ".*"+searchString+".*", $options: 'i' }},{texto:{ $regex: ".*"+searchString+".*", $options: 'i' }}]
        //
        //     }
        //     return Actividades.find(query).count()
        // }
    })


    // This code only runs on the server
    Meteor.publish('resenas', function resenasPublication() {
        return Resenas.find({},{$sort:{updated:-1}});

    });



}