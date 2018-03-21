import './prensaArchivo.html'
import { Prensa} from '/imports/api/prensa/prensa.js';


var currentPage = new ReactiveVar();
var totalPages = new ReactiveVar();
var totalPrensa = new ReactiveVar();
var searchString = new ReactiveVar();
var largoDePagina = 16;
Template.prensaArchivo.onCreated(function(){
    currentPage.set(1);
    this.autorun(function(){
        Meteor.subscribe('prensa',{sort:{fecha:-1}, skip:(currentPage.get()-1)*largoDePagina,limit:largoDePagina, search: searchString.get()});
        Meteor.call('getTotalLibros', searchString.get(), function(err, res){
            if(res){
                totalPages.set(Math.ceil(res/largoDePagina));
                totalPrensa.set(res);
            }
        })
    })
})

Template.prensaArchivo.helpers({
    'prensa':function(){
        // return Prensa.find({},{sort:{fecha:-1}})
        var iterator = -1;
        var extendedPrensa = _.map(Prensa.find({},{sort:{fecha:-1}}).fetch(), function(pren){
            iterator++;
            return _.extend(pren, {position:iterator})
        })
        return extendedPrensa;
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
    'esPar': function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    },
    'tieneFotos': function(){
        return this.fotos.length > 0;
    }
})

Template.prensaArchivo.events({
    'click .next-page': function(){
        currentPage.set(currentPage.get()+1);
    },
    'click .prev-page': function(){
        currentPage.set(currentPage.get()-1);
    },
    'change .search-prensa': function(event, ctx){
        searchString.set(event.currentTarget.value);
        currentPage.set(1);
    },
    'click .galeriaFotos': function(){
        Modal.show("galeriaFotos",this);
    }
})