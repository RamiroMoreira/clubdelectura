import './addLibroModal.html';
import { Actividades} from '/imports/api/actividades/actividades.js';

var nombreLibro;
var autorLibro;
var searchString;
var selectedActivity;
var caratula;
var libroId;
Template.addLibroModal.onCreated(function(){
    nombreLibro = new ReactiveVar("");
    autorLibro = new ReactiveVar("");
    searchString = new ReactiveVar("");
    selectedActivity = new ReactiveVar("");
    caratula = new ReactiveVar("")
    libroId = new ReactiveVar("");
    if(this.data) {
        nombreLibro.set(this.data.nombre);
        autorLibro.set(this.data.autor);
        caratula.set(this.data.caratula);
        selectedActivity.set(this.data.actividadId);
        libroId.set(this.data._id);
    }
    this.autorun(function () {
       Meteor.subscribe('actividades', {sort: {inicio: -1}, limit: 10, search: searchString.get()});
    })

})

Template.addLibroModal.onRendered(function(){
    this.autorun(function () {
        Meteor.setTimeout(function () {
            if (_.isString(selectedActivity.get())) {
                $('.selectpicker')[0].value = selectedActivity.get();
                $('.selectpicker').selectpicker('refresh');
            }
        }, 100)
    })

})
Template.addLibroModal.helpers({
    'nombreLibro': function () {
        return nombreLibro.get();
    },
    'autorLibro': function () {
        return autorLibro.get();
    },
    'actividades': function (){
        Meteor.setTimeout(function(){
            $('.selectpicker').selectpicker('refresh');

        },100)
        return Actividades.find({},{sort:{inicio:-1}})
    },
    'caratula': function (){
        return caratula.get();
    },
    'isSelected': function(){
        return selectedActivity.get() === this._id;
    }
});

Template.addLibroModal.events({
    'keyup .bs-searchbox': function(){
        searchString.set($(".bs-searchbox").find("input")[0].value)
        Meteor.setTimeout(function(){
            $('.selectpicker').selectpicker('refresh');

        },100)
    },
    'change .selectpicker': function(evt, ctx){
        selectedActivity.set(Actividades.findOne({_id:evt.currentTarget.value}));
    },
    'change #nombreLibro': function(evt){
        nombreLibro.set(evt.currentTarget.value);
    },
    'change #autorLibro': function(evt){
        autorLibro.set(evt.currentTarget.value);
    },
    'change .libro-caratula' ( event, template ) {
        var self = this;
        utils.uploadToAmazonS3( { event: event, template: template } ).then(function(res, err){
            if(res){
                caratula.set(res);
            }
        });
    },
    'click .save-btn': function(e) {
        var nuevoLibro = {}
        if (nombreLibro.get()) {
            nuevoLibro.nombre = nombreLibro.get();
        }
        if (autorLibro.get()) {
            nuevoLibro.autor = autorLibro.get();
        }
        if (caratula.get()) {
            nuevoLibro.caratula = caratula.get();
        }

        if (selectedActivity.get()) {
            nuevoLibro.actividad = selectedActivity.get();
        }
        if (libroId.get()) {
            Meteor.call('libros.update', nuevoLibro, function (err, res) {
                Modal.hide();
            })
        }
        else {
            Meteor.call('libros.insert', nuevoLibro, function (err, res) {
                Modal.hide();
            })
        }
    }
})
