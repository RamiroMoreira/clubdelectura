import './textActivity.html'
import { Template } from 'meteor/templating'

Template.colaboradoresDisplay.helpers({
    'colaboradores': function(){
        debugger;
        var self = this;
        if(this.colaboradores === []){
            return false;
        }
        else{
            return this.colaboradores;
        }
    }
})
