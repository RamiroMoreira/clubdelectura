import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Colaboradores = new Mongo.Collection('colaboradores');
if (Meteor.isServer) {

    Meteor.methods({
        'colaboradores.insert'(){
            console.log("inserting colaborador")
            var user;
            if (! this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            else{
                user = Meteor.users.findOne(this.userId);

            }
            Colaboradores.insert({
                dateCreated: new Date(),
                createdBy: user.username
            });
        },
        'colaboradores.update'(colaborador){
            check(colaborador._id, String);
            // check(actividad.inicio, Date);
            var user;
            if (! this.userId) {
                throw new Meteor.Error('not-authorized');
            }
            else{
                user = Meteor.users.findOne(this.userId);

            }
            Colaboradores.update({_id: colaborador._id},{$set: {
                nombre: colaborador.nombre,
                url: colaborador.url,
            }
            });
        },
        'colaboradores.remove'(colaboradorId){
            check(colaboradorId, String);
            if(!this.userId){
                throw new Meteor.Error('not-authorized');
            }
            Colaboradores.remove(colaboradorId);
        },
        'colaboradores.addFoto'(colaboradorId, urlFoto){
            check(colaboradorId, String);
            check(urlFoto, String);
            if(!this.userId){
                throw new Meteor.Error('not-authorized');
            }
            Colaboradores.update({_id: colaboradorId}, {
                $set: {
                    urlFoto:urlFoto
                }
            })
        }
    })


    // This code only runs on the server
    Meteor.publish('colaboradores', function colaboradoresPublication() {
        return Colaboradores.find();
    });
}