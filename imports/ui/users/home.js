import { Template } from 'meteor/templating';
// import './body.html';
import { Actividades} from '/imports/api/actividades/actividades.js';
import './home.html'
import './actividadItem.js'


Template.Home.onCreated(function(){
  Meteor.subscribe('actividades');
})

Template.Home.onRendered(function(){
  SK = skrollr.init({
    easing: {
      //This easing will sure drive you crazy
      wtf: Math.random,
      inverted: function(p) {
        return 1 - p;
      }
    }
  });
})

Template.Home.helpers({
  'actividades': function(){
     var iterator = -1;
     var extendedActivities = _.map(Actividades.find().fetch(), function(act){
       iterator++;
       return _.extend(act, {position:iterator})
     })
     return extendedActivities;
  }
})
