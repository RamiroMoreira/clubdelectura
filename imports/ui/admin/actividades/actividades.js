import { Template } from 'meteor/templating'
import './addActivityModal.js'
import './actividades.html';
import { Actividades} from '/imports/api/actividades/actividades.js';


Template.actividades.onCreated(function(){
  // this.state = new ReactiveDict();
  Meteor.subscribe('actividades');
})

Template.actividades.events({
  'click .addActivity': function(){
    Modal.show("addActivityModal");
  }
})

Template.actividades.helpers({
  'Actividades': function(){
    return Actividades.find();
  },
  'getDate': function(date){
    return moment(date).format('DD/MM/YYYY h:mm A');
  }
})
