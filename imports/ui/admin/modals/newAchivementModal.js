import './newAchivementModal.html';
import { Template } from 'meteor/templating'

var titulo = new ReactiveVar("");
var texto = new ReactiveVar("");
var icon = new ReactiveVar("");


Template.newAchivementModal.onCreated(function(){
    titulo.set(this.data.title)
    texto.set(this.data.texto)
    icon.set(this.data.icon)
})

Template.newAchivementModal.helpers({
    'getTitle': function(){
        return titulo.get()
    },
    'getText': function(){
        return texto.get();
    },
    'getIcon': function(){
        return icon.get();
    }
})

Template.newAchivementModal.events({

})