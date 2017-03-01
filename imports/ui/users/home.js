import { Template } from 'meteor/templating';
// import './body.html';
import {Actividades} from '/imports/api/actividades/actividades.js';
import './home.html'



Template.Home.onRendered(function(){
  skrollr.init({
    easing: {
      //This easing will sure drive you crazy
      wtf: Math.random,
      inverted: function(p) {
        return 1 - p;
      }
    }
  });
})