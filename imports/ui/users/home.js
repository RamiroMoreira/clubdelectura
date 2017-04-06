import { Template } from 'meteor/templating';
// import './body.html';
import { Actividades} from '/imports/api/actividades/actividades.js';
import './home.html'
import './actividadItem.js'

var expandedMenu = new ReactiveVar(false)
var satie = new ReactiveVar(false)
var audio;

Template.Home.onCreated(function(){
    satie.set(false);
    audio = false;
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
  },
  'satie': function(){
      return satie.get() ? "satieFalse" :  "satie";
  },
  'expandedMenu': function(){
      if(!expandedMenu.get()){
          return ""
      }
  },
  'expandedMenuClass': function(){
    if(!expandedMenu.get()){
       return ""
    }
    else{
        return "menu-expanded"
    }
  },
  'isSelected': function(value){
      if(value === expandedMenu.get()){
          return "horizontal-menu-item-selected"
      }
      else{
          return "";
      }

  },
  'getheight': function(){
      if(Actividades) {
          debugger;
          return Actividades.find().count() * 100 -150;
      }
  }
})

Template.Home.events({
  'click .satie': function(){
     if(!audio) {
         audio = new Audio('satie.mp3');
         audio.loop = true;
     }
     if(!satie.get()) {
         audio.play();
         satie.set(true);
     }

  },
  'click .satieFalse': function(){
      audio.pause();
      satie.set(false)
  },
  'click .horizontal-menu-item':function(e){
      debugger;
      if(expandedMenu.get() === e.target.getAttribute('data-value')){
          expandedMenu.set(false);
      }
      else{
          expandedMenu.set(e.target.getAttribute('data-value'));
      }

  }
})

