import './modalActivity.html';
import { Template } from 'meteor/templating'
import '/imports/ui/users/actividad/actividad.js';

var activityId = new ReactiveVar("");


Template.modalActivity.onCreated(function(){
    activityId.set(this.data._id)
    window.history.replaceState("", "", "/actividadInfo/"+this.data._id);
})

Template.modalActivity.helpers({
    'activityId': function(){
        return activityId.get();
    }
})

Template.modalActivity.events({
    // 'click .galeriaFotos': function(){
    //     Modal.show("galeriaFotos",activityId.get());
    // }
})

Template.modalActivity.onDestroyed(function(){
    window.history.replaceState("", "", "/");
    activityId.set("");
})