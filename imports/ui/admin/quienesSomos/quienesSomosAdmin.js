import './quienesSomosAdmin.html'
import { Template } from 'meteor/templating'
import { Textos} from '/imports/api/textos/textos.js';
import { Personas} from '/imports/api/personas/personas.js';

var presentacion;
var personsToUpdate = [];

Template.quienesSomosAdmin.created = function(){
  presentacion = new ReactiveVar(false);
  Meteor.subscribe('textos');
  Meteor.subscribe('personas');

}

Template.quienesSomosAdmin.helpers({
  'presentacion': function(){
    var texto = Textos.findOne({codigo:"presentacion"});
    return texto && texto.texto
  },
  'personas': function(){
    if(!Personas.findOne()){
      return false;
    }
    return Personas.find();
  },
  'presentacionFoto': function(){
      var texto = Textos.findOne({codigo:"presentacion"});
      return texto && texto.fotoUrl
  }
})

Template.quienesSomosAdmin.events({
  "change #textoPresentacion": function(e, ctx){
    presentacion.set(e.target.value)
  },
  "click .save-changes": function(e, ctx){
    if(_.isString(presentacion.get()))
    Meteor.call('textos.upsert', presentacion.get(), "presentacion", function(err, res){
      if(!err){
        Notifications.success('', 'Presentacion guardada con exito');
      }
    })
    _.each(personsToUpdate, function(person){
      Meteor.call("personas.update", person, function(err, res){
        if(!err){
          var display = person.nombre || "Persona";
          Notifications.success('', display + ' guardada con exito');
        }
      });
    })
  },
  "click .addPersona": function(){
    Meteor.call('personas.insert')
  },
  'click .btn-remove-person': function(){
    var id = this._id;
    var displayPersona = this.nombre || "esta persona";
    Modal.show("confirmModal",{title:"Eliminar actividad", texto:"Estas seguro que deseas eliminar a"+displayPersona+"?", actionIfConfirm: function(){
      Meteor.call('personas.remove', id);
    }});
  },
  'change .persona-Nombre': function(e, ctx){
    var updated = false;
    _.each(personsToUpdate,function(person){
       if(person._id === this._id){
         person.nombre = e.target.value;
         updated = true;
       }
    })
    if(!updated){
      var toUpdate = this;
      toUpdate.nombre = e.target.value;
      personsToUpdate.push(toUpdate);
    }
  },
  'change .descripcion-persona': function(e, ctx){
    var updated = false;
    _.each(personsToUpdate,function(person){
      if(person._id === this._id){
        person.texto = e.target.value;
        updated = true;
      }
    })
    if(!updated){
      var toUpdate = this;
      toUpdate.texto = e.target.value;
      personsToUpdate.push(toUpdate);
    }
  },
  'change .persona-foto' ( event, template ) {
    var self = this;
      utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
          Meteor.call("personas.addFoto", self._id, res, function(err, res){

          });
      });
  },
  'change .general-foto' ( event, template ) {
      var texto = Textos.findOne({codigo:"presentacion"});
      utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
            Meteor.call("textos.addFoto", texto._id, res, function(err, res){

            });
        });
  }
})

