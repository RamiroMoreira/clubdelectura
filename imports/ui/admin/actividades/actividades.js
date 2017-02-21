import { Template } from 'meteor/templating'
import './addActivityModal.js'
import './actividades.html';


Template.actividades.events({
  'click .addActivity': function(){
    Modal.show("addActivityModal");
  }
})