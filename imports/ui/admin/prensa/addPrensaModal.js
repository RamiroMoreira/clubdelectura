import './addPrensaModal.html';
import { Prensa} from '/imports/api/prensa/prensa.js';


var tituloPrensa;
var resumenPrensa;
var linkPrensa;
var caratula;
var fotos = [];
var fotosDepend = new Tracker.Dependency;
var fecha;
var audio;
var youtube;
var prensaId;
var error;

Template.addPrensaModal.onCreated(function(){
    error = new ReactiveVar("");
    tituloPrensa = new ReactiveVar("");
    resumenPrensa = new ReactiveVar("");
    linkPrensa = new ReactiveVar("");
    caratula = new ReactiveVar("");
    audio = new ReactiveVar("")
    youtube = new ReactiveVar("");
    prensaId = new ReactiveVar("");
    fecha = new ReactiveVar("");
    fotos = [];
    fotosDepend.changed();
    if(this.data) {
        tituloPrensa.set(this.data.titulo);
        resumenPrensa.set(this.data.resumen);
        caratula.set(this.data.caratula);
        linkPrensa.set(this.data.link);
        prensaId.set(this.data._id);
        audio.set(this.data.audio);
        youtube.set(this.data.youtube);
        fotos = this.data.fotos;
        fecha.set(this.data.fecha);
        fotosDepend.changed();
    }

})

Template.addPrensaModal.onRendered(function(){
        if(fecha.get()){
            this.$('#datetimepickerFecha').datetimepicker({defaultDate:fecha.get(), format:"DD/MM/YYYY h:mm A"});

        }
        else{
            this.$('#datetimepickerFecha').datetimepicker({format:"DD/MM/YYYY h:mm A"});
        }
})

Template.addPrensaModal.helpers({
    'tituloPrensa': function () {
        return tituloPrensa.get();
    },
    'resumenPrensa': function () {
        return resumenPrensa.get();
    },
    'caratula': function (){
        return caratula.get();
    },
    'linkPrensa': function(){
        return linkPrensa.get();
    },
    'fotosPrensa': function(){
        fotosDepend.depend()
        return fotos;
    },
    'audio': function(){
        return audio.get();
    },
    'videoPrensa': function(){
        return youtube.get();
    },
    'error': function(){
        return error.get();
    }

});


Template.addPrensaModal.events({
    'change #tituloPrensa': function(evt){
        tituloPrensa.set(evt.currentTarget.value);
    },
    'change #resumenPrensa': function(evt){
        resumenPrensa.set(evt.currentTarget.value);
    },
    'change #linkPrensa': function(evt){
        linkPrensa.set(evt.currentTarget.value);
    },
    'change #videoPrensa': function(evt){
        youtube.set(evt.currentTarget.value);
    },
    'change .prensa-caratula' ( event, template ) {
        var self = this;
        utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
            if(res){
                caratula.set(res);
            }
        });
    },
    'change .prensa-foto' ( event, template ) {
        var self = this;
        utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
            if(res){
                fotos.push(res);
                fotosDepend.changed();
            }
        });
    },
    'change .prensa-audio' ( event, template ) {
        var self = this;
        utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
            if(res){
                audio.set(res);
            }
        });
    },
    'click .remove-foto': function(){
        var newArray = [];
        var self = this;
        _.each(fotos, function(fotoUrl){
            if(fotoUrl != self){
                newArray.push(fotoUrl)
            }
        })
        fotos = newArray;
        fotosDepend.changed();
    },
    'click .save-btn': function(e) {
        var nuevaPrensa = {}
        var stringFecha = $('#datetimepickerFecha')[0].value;
        if(stringFecha) {
            fecha.set(moment($('#datetimepickerFecha')[0].value, "DD/MM/YYYY h:mm A").toDate());
        }

        if(!tituloPrensa.get() || !resumenPrensa.get() || (!caratula.get() && fotos.length === 0) || !fecha.get()){
            error.set("Error, titulo, resumen, caratula o fecha faltantes")
            return;
        }

        if (tituloPrensa.get()) {
            nuevaPrensa.titulo = tituloPrensa.get();
        }
        if (resumenPrensa.get()) {
            nuevaPrensa.resumen = resumenPrensa.get();
        }
        if (linkPrensa.get()) {
            nuevaPrensa.link = linkPrensa.get();
        }
        if (caratula.get()) {
            nuevaPrensa.caratula = caratula.get();
        }
        if (audio.get()) {
            nuevaPrensa.audio = audio.get();
        }
        if (youtube.get()) {
            nuevaPrensa.youtube = youtube.get();
        }
        if (fecha.get()) {
            nuevaPrensa.fecha = fecha.get();
        }
        nuevaPrensa.fotos = fotos;
        if (prensaId.get()) {
            nuevaPrensa._id = prensaId.get();
            Meteor.call('prensa.update', nuevaPrensa, function (err, res) {
                Modal.hide();
            })
        }
        else {
            Meteor.call('prensa.insert', nuevaPrensa, function (err, res) {
                console.log(err);
                Modal.hide();
            })
        }
    }
})
