import './actividadItem.html'
import { Template } from 'meteor/templating';
// import '/imports/ui/textualize.js';
import '/imports/ui/users/templatesImages/teconmedialunas.js'
import '/imports/ui/users/templatesImages/dragon.js'
import '/imports/ui/users/templatesImages/tipitaalsol.js'
import '/imports/ui/users/templatesImages/pareja.js'
import '/imports/ui/users/templatesImages/monstruo.js'
import '/imports/ui/users/templatesImages/musculoso.js'
import '/imports/ui/users/templatesImages/niñoLeyendo.js'
import '/imports/ui/users/templatesImages/quiroga.js'
import '/imports/ui/users/templatesImages/libroclub.js'
import '/imports/ui/users/templatesImages/librocasa.js'
import '/imports/ui/users/templatesImages/gato.js'

var txt = {};
var txtdescripcion = {};
var optionsTextualizer = {
    duration: 0, // Time (ms) each blurb will remain on screen
    rearrangeDuration: 500, // Time (ms) a character takes to reach its position
    effect: 'fadeIn', // Animation effect the characters use to appear
    centered: false, // Centers the text relative to its container
    loop:false
}
var margintop;
Template.actividadItem.onRendered(function(){

  var activity = this.data;
  var div = this.find('div.event-timeLine');
  var base = 2900;
  var offset = 100;
  margintop = activity.position*offset;
  div.style["margin-top"] = margintop+"vh";
  // div.setAttribute("data-"+(base+activity.position*offset),"display:block")
  // div.setAttribute("data-"+(base+500+activity.position*offset),"display:block;top:0%")
  // div.setAttribute("data-"+(base+1000+activity.position*offset),"top:0%")
  // div.setAttribute("data-"+(base+1500+activity.position*offset),"display:none;top:-100%")
  // SK.refresh([div]);

  // var search = "." + this.data._id
  // txt[this.data._id] = $(search);
  // if(txt[this.data._id]) {
  //     var test = txt[this.data._id].textualizer(optionsTextualizer);
      // txt[this.data._id].textualizer('start', optionsTextualizer);
      // txt[this.data._id].textualizer('pause');
  // }
  // var searchDescripcion = "." + this.data._id+"texto"
  // txtdescripcion[this.data._id] = $(searchDescripcion);
  // if(txtdescripcion[this.data._id]) {
  //     txtdescripcion[this.data._id].textualizer(optionsTextualizer);
  //     txtdescripcion[this.data._id].textualizer('start', optionsTextualizer);
  //     txtdescripcion[this.data._id].textualizer('pause');
  // }

});

var shuffle = function (texto) {
    var a = texto.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

Template.actividadItem.helpers({
    'margin-top': function(){
      return   margintop;
    },
    'getRandomText': function(){
        return this.nombre;
    },
    'getRandomTextDescripcion': function(){
        return this.texto;
    },
    // 'rightTexto': function(){
    //     if(this.dibujo === "dragon"){
    //         return true;
    //     }
    //     else if(this.dibujo === "teconmedialunas"){
    //         return false;
    //     }
    //     else if(this.dibujo === "quiroga"){
    //         return false;
    //     }
    //     else if(this.dibujo === "libroclub"){
    //         return true;
    //     }
    //     else if(this.dibujo === "librocasa"){
    //         return true;
    //     }
    //     else if(this.dibujo === "niñoLeyendo"){
    //         return false;
    //     }
    // },
    'getDibujo': function(){
        return this.dibujo;
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }
})

Template.actividadItem.events({
  // 'mouseenter .event-timeLine': function(){
  //     txt[this._id].textualizer('start',optionsTextualizer);
  //     txtdescripcion[this._id].textualizer('start',optionsTextualizer);
  // }
})