import './textActivity.html'
import { Template } from 'meteor/templating'
import '/imports/ui/admin/modals/galeriaFotos.js'
import '/imports/ui/admin/modals/modalActivity.js'

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

Template.colaboradoresDisplay.events({
    'click .colaborador-link': function(){
        if(!window.localStorage.getItem('achivementCuriosidad')) {
            if (window.localStorage.getItem("curiosityStat")) {
                var curiosityStat = window.localStorage.getItem("curiosityStat");
                curiosityStat++;
                window.localStorage.setItem("curiosityStat", curiosityStat);
            }
            else {
                window.localStorage.setItem("curiosityStat", 1);
            }
            if (curiosityStat == 3) {
                Modal.show("newAchivementModal", {
                    title: "New achivement unlocked!",
                    texto: "Felicidades amigo curioso! Has entrado a las paginas de 3 aliados.",
                    icon: "../inspiracion_desbloqueado.png"
                })
                window.localStorage.setItem('achivementCuriosidad', true);
            }
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
   },
   'click .actividad-nombre': function(){
       Modal.show("modalActivity",{_id: this._id});
   }
})

Template.textImpar.events({
   'click .galeriaFotos': function(){
       Modal.show("galeriaFotos",this);
   },
    'click .actividad-nombre': function(){
        Modal.show("modalActivity",{_id: this._id});
    }
})

Template.fechasDisplay.helpers({
    'fechaInicio': function(){
        if(this.inicio) {
            return moment(this.inicio).format('DD/MM/YYYY h:mm A');
        }
        else{
            return false;
        }
    },
    'fechaFin': function(){
        if(this.fin) {
            if(moment(this.fin).format('DD/MM/YYYY') === moment(this.inicio).format('DD/MM/YYYY')){
                return moment(this.fin).format('h:mm A');
            }
            else{
                return moment(this.fin).format('DD/MM/YYYY h:mm A');
            }

        }
        else{
            return false;
        }
    }
})