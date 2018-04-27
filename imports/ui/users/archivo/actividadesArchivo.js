import './actividadesArchivo.html'
import { Actividades} from '/imports/api/actividades/actividades.js';

var currentPage = new ReactiveVar();
var totalPages = new ReactiveVar();
var totalActivities = new ReactiveVar();
var searchString = new ReactiveVar();
var largoDePagina = 15;
var actividadesHandler;
Template.actividadesArchivo.onCreated(function(){
    currentPage.set(1);
    this.autorun(function(){
        actividadesHandler = Meteor.subscribe('actividades',{sort:{inicio:-1}, skip:(currentPage.get()-1)*largoDePagina,limit:largoDePagina, search: searchString.get()});
        Meteor.call('getTotalActivities', searchString.get(), function(err, res){
            if(res){
                totalPages.set(Math.ceil(res/largoDePagina));
                totalActivities.set(res);
            }
        })
    })
})

Template.actividadesArchivo.helpers({
    'actividades':function(){
        return Actividades.find({},{sort:{inicio:-1}})
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
    'totalPages': function(){
        return totalPages.get();
    },
    'currentPage': function(){
        return currentPage.get();
    },
    'next': function(){
        return currentPage.get()<totalPages.get();
    },
    'prev': function(){
        return currentPage.get()>1
    }
})

Template.actividadesArchivo.events({
    'click .next-page': function(){
        currentPage.set(currentPage.get()+1);
    },
    'click .prev-page': function(){
        currentPage.set(currentPage.get()-1);
    },
    'change .search-actividad': function(event, ctx){
        searchString.set(event.currentTarget.value);
        currentPage.set(1);
    }
})

Template.actividadesArchivo.onDestroyed(function(){
    actividadesHandler.stop();
})