import { Template } from 'meteor/templating'
import './aliados.html'
import { Colaboradores} from '/imports/api/colaboradores/colaboradores.js';

var colaboradoresToUpdate = [];

Template.aliadosAdmin.created = function(){
    Meteor.subscribe('colaboradores');
}

Template.aliadosAdmin.helpers({
    'colaboradoresList': function(){
        return Colaboradores.find();
    }
})

Template.aliadosAdmin.events({
    'click .addColaborador': function(){
        Meteor.call('colaboradores.insert')
    },
    "click .save-changes": function(e, ctx){
        _.each(colaboradoresToUpdate, function(colaborador){
            Meteor.call("colaboradores.update", colaborador, function(err, res){
                if(!err){
                    var display = person.nombre || "Persona";
                    Notifications.success('', display + ' guardada con exito');
                }
            });
        })
    },
    'change .aliado-Nombre': function(e, ctx){
        var updated = false;
        _.each(colaboradoresToUpdate,function(colaborador){
            if(colaborador._id === this._id){
                colaborador.nombre = e.target.value;
                updated = true;
            }
        })
        if(!updated){
            var toUpdate = this;
            toUpdate.nombre = e.target.value;
            colaboradoresToUpdate.push(toUpdate);
        }
    },
    'change .aliado-Url': function(e, ctx){
        var updated = false;
        _.each(colaboradoresToUpdate,function(colaborador){
            if(colaborador._id === this._id){
                colaborador.url = e.target.value;
                updated = true;
            }
        })
        if(!updated){
            var toUpdate = this;
            toUpdate.url = e.target.value;
            colaboradoresToUpdate.push(toUpdate);
        }
    },
    'change .aliado-foto' ( event, template ) {
        var self = this;
        utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
            Meteor.call("colaboradores.addFoto", self._id, res, function(err, res){

            });
        });
    }
})