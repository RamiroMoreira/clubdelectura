import { Template } from 'meteor/templating';
// import './body.html';
import { Actividades} from '/imports/api/actividades/actividades.js';
import './home.html'
import './actividadItem.js'

//http://compresspng.com/es/ compress png


var expandedMenu = new ReactiveVar(false)
var satie = new ReactiveVar(false)
audio = undefined;
var base = 2000;
var offset = 550;
var actividadesFuturas = [];
var actividadesFuturasReactive = new Tracker.Dependency;
var actividadesHandler;
Template.Home.onCreated(function(){
    satie.set(false);
    audio = false;
    actividadesHandler = Meteor.subscribe('actividades', {soloAnteriores: true, limit:20, sort:{inicio:-1}});
  Meteor.call('getActividadesFuturas', function(err, res){
      if(res){
          actividadesFuturas = res;
          actividadesFuturasReactive.changed();
      }
  })
})

Template.Home.onDestroyed(function(){
    actividadesHandler.stop();

})

Template.Home.onRendered(function(){
      SK = skrollr.init({
          easing: {
              //This easing will sure drive you crazy
              wtf: Math.random,
              // mobileCheck: function () {
              //     return false
              // },
              inverted: function (p) {
                  return 1 - p;
              }

          }
      });
      SK.refresh();
    var controller = new ScrollMagic.Controller();

    var scene3 = new ScrollMagic.Scene({offset:2000})
    // trigger a velocity opaticy animation
        .setPin("#background-lineaDelTiempo")
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

})

Template.Home.helpers({
  'actividades': function(){
     var iterator = -1;
     var extendedActivities = _.map(Actividades.find({},{sort:{inicio:-1}}).fetch(), function(act){
       iterator++;
       return _.extend(act, {position:iterator})
     })
     return extendedActivities;
  },
  'fechaInicio': function(){
        if(this.inicio) {
            return moment(this.inicio).format('DD/MM/YYYY h:mm A');
        }
        else{
            return false;
        }
  },
  'getFirstFoto': function(){
      if(this.fotos) {
          return this.fotos[0];
      }
      else{
          return false;
      }
  },
  'fechaFin': function(){
        if(this.fin) {
            if(moment(this.fin).format('DD/MM/YYYY') === moment(this.inicio).format('DD/MM/YYYY')){
                return moment(this.fin).format('h:mm A');
            }
            else{
                return moment(this.fin).format('DD/MM/YYYY h:mm A');
            }

        }
        else{
            return false;
        }
  },
  'actividadesFuturas': function(){

      actividadesFuturasReactive.depend();
      if(actividadesFuturas.length>0) {
          actividadesFuturas[0].active = true;
          return actividadesFuturas;
      }
      else{
          return false;
      }
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
          return Actividades.find().count() * 100;
      }
  },
  'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
  },
  'getDibujoString':function(){
      return ""+this.dibujo + ".png"
  }
})

var smothScroll = function(numberMoves, time, base, end){
    var count = 0;
    var lamda = (end - base)/numberMoves;
    var interval = Meteor.setInterval(function(){
       count++;
       window.scrollTo(0, base+(lamda*count));
       if(count === numberMoves){
           Meteor.clearInterval(interval);
       }
    }, time/numberMoves)
}

Template.Home.events({
  'click .satie': function(){
     if(!audio) {
         audio = new Audio('satie.mp3');
         audio.loop = true;
     }
     if(!satie.get()) {
         audio.stop();
         audio.play();
         satie.set(true);
     }

  },
  'click .satieFalse': function(){
      audio.pause();
      satie.set(false)
  },
  // 'click .horizontal-menu-item':function(e){
  //     if(expandedMenu.get() === e.target.getAttribute('data-value')){
  //         expandedMenu.set(false);
  //     }
  //     else{
  //         expandedMenu.set(e.target.getAttribute('data-value'));
  //     }
  //
  // },
  'click .navigation-down':function(e){
      // window.scrollTo(0,5000)
      var scrollY = window.scrollY;
      if(scrollY >=0 && scrollY < base){
          // window.scrollTo(0,base)
          smothScroll(12, 300, scrollY,  base)
      }
      else if(scrollY >= base + 300+offset* Actividades.find().count()){

      }
      else{
          var position = Math.floor((scrollY - base+300)/offset);
          smothScroll(12, 300, scrollY,  base+300+((position)*offset));
      }
      $('.navigation-button-0').toggleClass('navigation-button-0-active-down')
      $('.navigation-button-1').toggleClass('navigation-button-1-active-down')
      $('.navigation-button-2').toggleClass('navigation-button-2-active-down')
      $('.navigation-button-3').toggleClass('navigation-button-3-active-down')
      $('.navigation-button-4').toggleClass('navigation-button-4-active-down')
      $('.navigation-button-5').toggleClass('navigation-button-5-active-down')
      Meteor.setTimeout(function(){
          $('.navigation-button-0').toggleClass('navigation-button-0-active-down')
          $('.navigation-button-1').toggleClass('navigation-button-1-active-down')
          $('.navigation-button-2').toggleClass('navigation-button-2-active-down')
          $('.navigation-button-3').toggleClass('navigation-button-3-active-down')
          $('.navigation-button-4').toggleClass('navigation-button-4-active-down')
          $('.navigation-button-5').toggleClass('navigation-button-5-active-down')
      },500)
  },
  'click .navigation-top':function(e){
        // window.scrollTo(0,5000)
        var scrollY = window.scrollY;
        if(scrollY >0 && scrollY <= base){
            // window.scrollTo(0,0)
            smothScroll(12, 300, scrollY, 0)
            // window.scroll({top: 0,behavior:'smooth'})
        }
        else if(scrollY >0 && scrollY <= base + offset ){
            smothScroll(12, 300, scrollY, base)
            // window.scrollTo(0,base)
            // window.scroll({top: base,behavior:'smooth'})
        }
        else{
            var position = Math.floor((scrollY - base+200)/offset);
            if(position > 1) {
                smothScroll(12, 300, scrollY, base + 300 + ((position - 1) * offset))
            }
            else{
                smothScroll(12, 300, scrollY, base + ((position - 1) * offset))

            }
            // window.scrollTo(0, base+((position-1)*offset));
        }
      $('.navigation-button-1').toggleClass('navigation-button-1-active-up')
      $('.navigation-button-2').toggleClass('navigation-button-2-active-up')
      $('.navigation-button-3').toggleClass('navigation-button-3-active-up')
      $('.navigation-button-4').toggleClass('navigation-button-4-active-up')
      $('.navigation-button-5').toggleClass('navigation-button-5-active-up')
      $('.navigation-button-6').toggleClass('navigation-button-6-active-up')
      Meteor.setTimeout(function(){
          $('.navigation-button-1').toggleClass('navigation-button-1-active-up')
          $('.navigation-button-2').toggleClass('navigation-button-2-active-up')
          $('.navigation-button-3').toggleClass('navigation-button-3-active-up')
          $('.navigation-button-4').toggleClass('navigation-button-4-active-up')
          $('.navigation-button-5').toggleClass('navigation-button-5-active-up')
          $('.navigation-button-6').toggleClass('navigation-button-6-active-up')
      },500)
  },
  'click .navigation-top-max':function(e){
      // window.scrollTo(0,0)
      smothScroll(12, 300, scrollY,  0)

      $('.navigation-button-1').toggleClass('navigation-button-1-active-up')
      $('.navigation-button-2').toggleClass('navigation-button-2-active-up')
      $('.navigation-button-3').toggleClass('navigation-button-3-active-up')
      $('.navigation-button-4').toggleClass('navigation-button-4-active-up')
      $('.navigation-button-5').toggleClass('navigation-button-5-active-up')
      $('.navigation-button-6').toggleClass('navigation-button-6-active-up')
      Meteor.setTimeout(function(){
          $('.navigation-button-1').toggleClass('navigation-button-1-active-up')
          $('.navigation-button-2').toggleClass('navigation-button-2-active-up')
          $('.navigation-button-3').toggleClass('navigation-button-3-active-up')
          $('.navigation-button-4').toggleClass('navigation-button-4-active-up')
          $('.navigation-button-5').toggleClass('navigation-button-5-active-up')
          $('.navigation-button-6').toggleClass('navigation-button-6-active-up')
      },500)
  },
    'click .navigation-down-max':function(e){
        // window.scrollTo(0,0)
        smothScroll(12, 300, scrollY,  base + 200 + ((Actividades.find().count())) * offset)

        $('.navigation-button-1').toggleClass('navigation-button-1-active-up')
        $('.navigation-button-2').toggleClass('navigation-button-2-active-up')
        $('.navigation-button-3').toggleClass('navigation-button-3-active-up')
        $('.navigation-button-4').toggleClass('navigation-button-4-active-up')
        $('.navigation-button-5').toggleClass('navigation-button-5-active-up')
        $('.navigation-button-6').toggleClass('navigation-button-6-active-up')
        Meteor.setTimeout(function(){
            $('.navigation-button-1').toggleClass('navigation-button-1-active-up')
            $('.navigation-button-2').toggleClass('navigation-button-2-active-up')
            $('.navigation-button-3').toggleClass('navigation-button-3-active-up')
            $('.navigation-button-4').toggleClass('navigation-button-4-active-up')
            $('.navigation-button-5').toggleClass('navigation-button-5-active-up')
            $('.navigation-button-6').toggleClass('navigation-button-6-active-up')
        },500)
    }

})

