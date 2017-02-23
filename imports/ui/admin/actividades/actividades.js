import { Template } from 'meteor/templating'
import './addActivityModal.js'
import './actividades.html';
import { Actividades} from '/imports/api/actividades/actividades.js';
import '/imports/ui/admin/modals/confirmModal.js'

Template.actividades.onCreated(function(){
  // this.state = new ReactiveDict();
  Meteor.subscribe('actividades');
})

Template.actividades.events({
  'click .addActivity': function(){
    Modal.show("addActivityModal");
  },
  'click .btn-remove': function(){
    var id = this._id;
    Modal.show("confirmModal",{title:"Eliminar actividad", texto:"Estas seguro que deseas eliminar esa actividad?", actionIfConfirm: function(){
       Meteor.call('actividades.remove', id);
    }});

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
