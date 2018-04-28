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