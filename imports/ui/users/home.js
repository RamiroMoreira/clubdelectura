import { Template } from 'meteor/templating';
// import './body.html';
import { Actividades} from '/imports/api/actividades/actividades.js';
import './home.html'
import './actividadItem.js'

//http://compresspng.com/es/ compress png


var expandedMenu = new ReactiveVar(false)
var satie = new ReactiveVar(false)
var audio;
var base = 2500;
var offset = 1000;

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
              mobileCheck: function () {
                  return false
              },
              inverted: function (p) {
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
          return Actividades.find().count() * 100 -150;
      }
  },
  'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
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
      if(expandedMenu.get() === e.target.getAttribute('data-value')){
          expandedMenu.set(false);
      }
      else{
          expandedMenu.set(e.target.getAttribute('data-value'));
      }

  },
  'click .navigation-down':function(e){
      // window.scrollTo(0,5000)
      var scrollY = window.scrollY;
      if(scrollY >=0 && scrollY < base){
          window.scrollTo(0,base)
      }
      else{
          var position = Math.floor((scrollY - base)/offset);
          window.scrollTo(0, base+((position+1)*offset));
      }

  },
  'click .navigation-top':function(e){
        // window.scrollTo(0,5000)
        var scrollY = window.scrollY;
        if(scrollY >0 && scrollY <= base){
            window.scrollTo(0,0)
        }
        else if(scrollY >0 && scrollY <= base + offset ){
            window.scrollTo(0,base)
        }
        else{
            var position = Math.floor((scrollY - base)/offset);
            window.scrollTo(0, base+((position-1)*offset));
        }

  }

})

