import './actividad.html'
import { Libros} from '/imports/api/libros/libros.js';
import { Actividades} from "../../../api/actividades/actividades";

var activityId;
var activity;
var libro;
ActividadController = RouteController.extend({

    action: function () {
        activityId = this.params["_id"]
        this.render('actividadInfo');
    }
});
var handlerSingleActivity;
var handlerLibroActivity;
Template.actividadInfo.onCreated(function(){
    activity = new ReactiveVar();
    libro = new ReactiveVar();
    this.autorun(function(){
        handlerSingleActivity = Meteor.subscribe('singleActivity', activityId);
        if(handlerSingleActivity.ready()){
            activity.set(Actividades.findOne({_id:activityId}))
        }
        handlerLibroActivity = Meteor.subscribe('libroActividad', activityId)
        if(handlerLibroActivity.ready()){
            libro.set(Libros.findOne({actividadId:activityId}));
        }

    })
})

Template.actividadInfo.helpers({
    'actividad':function(){
        return activity.get();
    },
    'libro':function(){
        return libro.get();
    },
    'fechaInicio': function(){
        if(this.inicio) {
            return moment(this.inicio).format('DD/MM/YYYY h:mm A');
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
    'caratula': function(){
        if(activity.get() && activity.get().fotos.length>0) {
            return activity.get().fotos[0].replace(" ", "%20");
        }
        else{
            return false;
        }
    },
    'dibujo': function(){
        if(activity.get())
          return activity.get().dibujo;
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }

})

Template.actividadInfo.events({
    'click .galeriaFotos': function(){
        Modal.show("galeriaFotos",activity.get());
    }
})