import './actividadItem.html'
import { Template } from 'meteor/templating';
// import '/imports/ui/textualize.js';
import '/imports/ui/users/templatesImages/teconmedialunas.js'
import '/imports/ui/users/templatesImages/dragon.js'
import '/imports/ui/users/templatesImages/tipitaalsol.js'
import '/imports/ui/users/templatesImages/pareja.js'
import '/imports/ui/users/templatesImages/monstruo.js'
import '/imports/ui/users/templatesImages/museo.js'
import '/imports/ui/users/templatesImages/calavera.js'
import '/imports/ui/users/templatesImages/camping.js'
import '/imports/ui/users/templatesImages/madre_e_hijo.js'
import '/imports/ui/users/templatesImages/pantalla.js'
import '/imports/ui/users/templatesImages/hombre_leyendo.js'
import '/imports/ui/users/templatesImages/robot.js'
import '/imports/ui/users/templatesImages/musculoso.js'
import '/imports/ui/users/templatesImages/niñoLeyendo.js'
import '/imports/ui/users/templatesImages/quiroga.js'
import '/imports/ui/users/templatesImages/libroclub.js'
import '/imports/ui/users/templatesImages/librocasa.js'
import '/imports/ui/users/templatesImages/gato.js'

var margintop;
Template.actividadItem.onRendered(function(){
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
    'getDibujo': function(){
        var self = this;
        return this.dibujo;
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }
})

Template.actividadItem.events({

})