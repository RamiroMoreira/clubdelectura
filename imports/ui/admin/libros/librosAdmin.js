import './librosAdmin.html'
import { Template } from 'meteor/templating'
import './addLibroModal.js'
import { Libros} from '/imports/api/libros/libros.js';
import '/imports/ui/admin/modals/confirmModal.js'

var currentPage = new ReactiveVar();
var totalPages = new ReactiveVar();
var totalLibros = new ReactiveVar();
var searchString = new ReactiveVar();
var largoDePagina = 20;
Template.librosAdmin.onCreated(function(){
    // this.state = new ReactiveDict();
    currentPage.set(1);
    this.autorun(function(){
        Meteor.subscribe('libros',{sort:{actividadInicio:-1}, skip:(currentPage.get()-1)*largoDePagina,limit:largoDePagina, search: searchString.get()});
        Meteor.call('getTotalLibros', searchString.get(), function(err, res){
            if(res){
                totalPages.set(Math.ceil(res/largoDePagina));
                totalLibros.set(res);
            }
        })
    })

})

Template.librosAdmin.events({
    'click .addLibro': function(){
        Modal.show("addLibroModal");
    },
    'click .btn-remove': function(){
        var id = this._id;
        Modal.show("confirmModal",{title:"Eliminar libro", texto:"Estas seguro que deseas eliminar este libro?", actionIfConfirm: function(){
            Meteor.call('libros.remove', id);
        }});
    },
    'click #edit-libro': function(){
        var id = this._id;
        Modal.show("addLibroModal",this);
    },
    'change .input-search': function(event, ctx){
        searchString.set(event.currentTarget.value);
        currentPage.set(1);
    },
    'click .next-page': function(){
        currentPage.set(currentPage.get()+1);
    },
    'click .prev-page': function(){
        currentPage.set(currentPage.get()-1);
    }
})

Template.librosAdmin.helpers({
    'libros': function(){
        return Libros.find();
    },
    // 'getDate': function(date){
    //     return moment(date).format('DD/MM/YYYY h:mm A');
    // },
    'totalLibros': function(){
        return totalLibros.get();
    },
    'currentPage': function(){
        return currentPage.get();
    },
    'totalPage': function(){
        return totalPages.get();
    },
    'next': function(){
        return currentPage.get()<totalPages.get();
    },
    'prev': function(){
        return currentPage.get()>1
    }
})
