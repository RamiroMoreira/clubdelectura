import { Template } from 'meteor/templating'
import './addActivityModal.js'
import './actividades.html';
import { Actividades} from '/imports/api/actividades/actividades.js';
import '/imports/ui/admin/modals/confirmModal.js'

var currentPage = new ReactiveVar();
var totalPages = new ReactiveVar();
var totalActivities = new ReactiveVar();
var searchString = new ReactiveVar();
var largoDePagina = 20;
Template.actividades.onCreated(function(){
  // this.state = new ReactiveDict();
  currentPage.set(1);
  this.autorun(function(){
      Meteor.subscribe('actividades',{sort:{inicio:-1}, skip:(currentPage.get()-1)*largoDePagina,limit:largoDePagina, search: searchString.get()});
      Meteor.call('getTotalActivities', searchString.get(), function(err, res){
        if(res){
          totalPages.set(Math.ceil(res/largoDePagina));
          totalActivities.set(res);
        }
      })
  })

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

  },
  'click #edit-actividad': function(){
    var id = this._id;
    Modal.show("addActivityModal",this);
  },
  'change .input-search': function(event, ctx){
      searchString.set(event.currentTarget.value);
      currentPage.set(1);
  },
  'click .next-page': function(){
    currentPage.set(currentPage.get()+1);
  },
  'click .prev-page': function(){
    currentPage.set(currentPage.get()-1);
  }
})

Template.actividades.helpers({
  'Actividades': function(){
    return Actividades.find();
  },
  isNewActivity: function(){
    var date = new Date();
    return this.inicio > date;
  },
  'getDate': function(date){
    return moment(date).format('DD/MM/YYYY h:mm A');
  },
  'totalActivities': function(){
    return totalActivities.get();
  },
  'currentPage': function(){
    return currentPage.get();
  },
  'totalPage': function(){
    return totalPages.get();
  },
  'next': function(){
    return currentPage.get()<totalPages.get();
  },
  'prev': function(){
    return currentPage.get()>1
  }
})
