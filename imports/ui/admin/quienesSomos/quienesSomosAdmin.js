import './quienesSomosAdmin.html'
import { Template } from 'meteor/templating'
import { Textos} from '/imports/api/textos/textos.js';

var presentacion;

Template.quienesSomosAdmin.created = function(){
  presentacion = new ReactiveVar(false);
  var subscription = Meteor.subscribe('textos');

}

Template.quienesSomosAdmin.helpers({
  'presentacion': function(){
    var texto = Textos.findOne({codigo:"presentacion"});
    return texto && texto.texto
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
  }
})

