import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Libros = new Mongo.Collection('libros');
if (Meteor.isServer) {

    Meteor.methods({
        'libros.insert'(libro){
            console.log("inserting", libro)
            check(libro.nombre, String);
            check(libro.autor, String);
            check(libro.caratula, String);
            // check(actividad.dibujo, String);
            var user;
            if (! this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            else{
                user = Meteor.users.findOne(this.userId);
            }
            if(libro.actividad) {
                Libros.insert({
                    nombre: libro.nombre,
                    actividadInicio: libro.actividad.inicio,
                    actividadNombre: libro.actividad.nombre,
                    actividadId: libro.actividad._id,
                    autor: libro.autor,
                    dateCreated: new Date(),
                    createdBy: user.username,
                    caratula: libro.caratula
                });
            }
            else{
                Libros.insert({
                    nombre: libro.nombre,
                    autor: libro.autor,
                    dateCreated: new Date(),
                    createdBy: user.username,
                    caratula: libro.caratula
                });
            }
        },
        'libros.update'(libro){
            check(libro.nombre, String);
            check(libro.autor, String);
            check(libro.caratula, String);
            // check(actividad.inicio, Date);
            var user;
            if (! this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            else{
                user = Meteor.users.findOne(this.userId);

            }
            if(libro.actividad) {
                Libros.update({_id: libro._id},{
                    nombre: libro.nombre,
                    actividadInicio: libro.actividad.inicio,
                    actividadNombre: libro.actividad.nombre,
                    actividadId: libro.actividad._id,
                    autor: libro.autor,
                    dateCreated: new Date(),
                    createdBy: user.username,
                    caratula: libro.caratula
                });
            }
            else{
                Libros.update({_id: libro._id},{
                    nombre: libro.nombre,
                    autor: libro.autor,
                    dateCreated: new Date(),
                    createdBy: user.username,
                    caratula: libro.caratula
                });
            }
        },
        'libros.remove'(libroId){
            check(libroId, String);
            Libros.remove(libroId);
        },
        'getTotalLibros': function(searchString){
            var query = {};
            if(searchString){
                query.$or = [{nombre:{ $regex: ".*"+searchString+".*", $options: 'i' }},{texto:{ $regex: ".*"+searchString+".*", $options: 'i' }}]

            }
            return Libros.find(query).count()
        }
    })


    // This code only runs on the server
    Meteor.publish('libros', function librosPublication(params) {
        var query = {};
        var agregations = {};
        // if(params.soloAnteriores){
        //     query.inicio = {$lte:new Date()}
        // }
        if(params.limit){
            agregations.limit = params.limit;
        }
        if(params.skip){
            agregations.skip = params.skip;
        }
        // if(params.sort){
        //     agregations.sort = params.sort;
        // }
        if(params.search){
            query.$or = [{nombre:{ $regex: ".*"+params.search+".*", $options: 'i' }},{autor:{ $regex: ".*"+params.search+".*", $options: 'i' }}]
        }
        return Libros.find(query,agregations);

    });


}