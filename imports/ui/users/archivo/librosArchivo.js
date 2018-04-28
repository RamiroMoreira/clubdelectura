import './librosArchivo.html'
import { Libros} from '/imports/api/libros/libros.js';


var currentPage = new ReactiveVar();
var totalPages = new ReactiveVar();
var totalLibros = new ReactiveVar();
var searchString = new ReactiveVar();
var largoDePagina = 16;
Template.librosArchivo.onCreated(function(){
    currentPage.set(1);
    this.autorun(function(){
        Meteor.subscribe('libros',{sort:{actividadNombre:-1}, skip:(currentPage.get()-1)*largoDePagina,limit:largoDePagina, search: searchString.get()});
        Meteor.call('getTotalLibros', searchString.get(), function(err, res){
            if(res){
                totalPages.set(Math.ceil(res/largoDePagina));
                totalLibros.set(res);
            }
        })
    })
})

Template.librosArchivo.helpers({
    'libros':function(){
        return Libros.find({},{sort:{actividadInicio:-1}})
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
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }
})

Template.librosArchivo.events({
    'click .next-page': function(){
        currentPage.set(currentPage.get()+1);
    },
    'click .prev-page': function(){
        currentPage.set(currentPage.get()-1);
    },
    'change .search-libros': function(event, ctx){
        searchString.set(event.currentTarget.value);
        currentPage.set(1);
    }
})