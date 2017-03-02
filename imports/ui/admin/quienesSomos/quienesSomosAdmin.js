import './quienesSomosAdmin.html'
import { Template } from 'meteor/templating'
import { Textos} from '/imports/api/textos/textos.js';
import { Personas} from '/imports/api/personas/personas.js';

var presentacion;

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
        Notifications.success('', 'Sus cambios han sido guardados');
      }
    })
  },
  "click .addPersona": function(){
    Meteor.call('personas.insert')
  }
})

