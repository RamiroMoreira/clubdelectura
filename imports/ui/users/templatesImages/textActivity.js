import './textActivity.html'
import { Template } from 'meteor/templating'
import '/imports/ui/admin/modals/galeriaFotos.js'

Template.colaboradoresDisplay.helpers({
    'colaboradores': function(){
        var self = this;
        if(this.colaboradores === []){
            return false;
        }
        else{
            return this.colaboradores;
        }
    }
})

Template.textPar.helpers({
    'tieneFoto': function(){
        if(this.fotos && this.fotos.length>0){
            return true;
        }
        else{
            return false;
        }
    }
})

Template.textImpar.helpers({
    'tieneFoto': function(){
        if(this.fotos && this.fotos.length>0){
            return true;
        }
        else{
            return false;
        }
    }
})

Template.textPar.events({
   'click .galeriaFotos': function(){
       Modal.show("galeriaFotos",this);
   }
})

Template.textImpar.events({
   'click .galeriaFotos': function(){
       Modal.show("galeriaFotos",this);
   }
})