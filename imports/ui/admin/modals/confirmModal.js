import './confirmModal.html';
import { Template } from 'meteor/templating'

var titulo = new ReactiveVar("");
var texto = new ReactiveVar("");


Template.confirmModal.onCreated(function(){
  titulo.set(this.data.title)
  texto.set(this.data.texto)

})

Template.confirmModal.helpers({
  'getTitle': function(){
    return titulo.get()
  },
  'getText': function(){
    return texto.get();
  }
})

Template.confirmModal.events({
  'click .aceptar-btn': function(){
    this.actionIfConfirm();
    Modal.hide();
    return true;
  },
  'click .cancel-btn': function(){
    Modal.hide();
    return false;
  }
})