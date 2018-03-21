import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Prensa = new Mongo.Collection('prensa');
if (Meteor.isServer) {

    Meteor.methods({
        'prensa.insert'(prensa){
            console.log("inserting", prensa)
            check(prensa.titulo, String);
            check(prensa.resumen, String);
            // check(actividad.dibujo, String);
            var user;
            if (! this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            else{
                user = Meteor.users.findOne(this.userId);
            }
            if(!prensa.caratula && prensa.fotos.length > 0){
                prensa.caratula = prensa.fotos[0];
            }
            Prensa.insert({
                titulo: prensa.titulo,
                resumen: prensa.resumen,
                fecha: prensa.fecha,
                caratula: prensa.caratula,
                fotos: prensa.fotos,
                youtube: prensa.youtube,
                audio: prensa.audio,
                link: prensa.link,
                dateCreated: new Date(),
                createdBy: user.username
            });
        },
        'prensa.update'(prensa){
            check(prensa.titulo, String);
            check(prensa.resumen, String);
            // check(actividad.inicio, Date);
            var user;
            if (! this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            else{
                user = Meteor.users.findOne(this.userId);

            }
            Prensa.update({_id: prensa._id},{$set: {
                titulo: prensa.titulo,
                resumen: prensa.resumen,
                fecha: prensa.fecha,
                caratula: prensa.caratula,
                fotos: prensa.fotos,
                youtube: prensa.youtube,
                audio: prensa.audio,
                link: prensa.link,
                dateCreated: new Date(),
                createdBy: user.username
            }});
        },
        'prensa.remove'(prensaId){
            check(prensaId, String);
            Prensa.remove(prensaId);
        },
        'getTotalPrensa': function(searchString){
            var query = {};
            if(searchString){
                query.$or = [{titulo:{ $regex: ".*"+searchString+".*", $options: 'i' }},{resumen:{ $regex: ".*"+searchString+".*", $options: 'i' }}]
            }
            return Prensa.find(query).count()
        }
    })


    // This code only runs on the server
    Meteor.publish('prensa', function prensaPublication(params) {
        console.log("subscribing", params);
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
            query.$or = [{titulo:{ $regex: ".*"+params.search+".*", $options: 'i' }},{resumen:{ $regex: ".*"+params.search+".*", $options: 'i' }}]
        }
        return Prensa.find(query,agregations);
    });
    // Meteor.publish("libroActividad", function libroActividadPublication(id){
    //     return Libros.find({actividadId:id});
    // })
}