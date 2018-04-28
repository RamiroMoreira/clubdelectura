import './nosotros.html'
import { Textos} from '/imports/api/textos/textos.js';
import { Personas} from '/imports/api/personas/personas.js';
import '../barraHorizontal.js'
Template.nosotros.created = function(){
    Meteor.subscribe('textos');
    Meteor.subscribe('personas');
}

Template.nosotros.helpers({
    'presentacion': function(){
        var texto = Textos.findOne({codigo:"presentacion"});
        return texto && texto.texto
    },
    'personas': function(){
        if(!Personas.findOne()){
            return false;
        }
        return Personas.find();
    },
    'presentacionFoto': function(){
        var texto = Textos.findOne({codigo:"presentacion"});
        return texto && texto.fotoUrl
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;

    }
})