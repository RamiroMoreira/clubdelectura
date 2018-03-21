import './prensaAdmin.html'
import { Template } from 'meteor/templating'
import './addPrensaModal.js'
import { Prensa} from '/imports/api/prensa/prensa.js';
import '/imports/ui/admin/modals/confirmModal.js'


var currentPage = new ReactiveVar();
var totalPages = new ReactiveVar();
var totalPrensa = new ReactiveVar();
var searchString = new ReactiveVar();
var largoDePagina = 20;

Template.prensaAdmin.onCreated(function(){
    // this.state = new ReactiveDict();
    currentPage.set(1);
    this.autorun(function(){
        Meteor.subscribe('prensa',{sort:{fecha:-1}, skip:(currentPage.get()-1)*largoDePagina,limit:largoDePagina, search: searchString.get()});
        Meteor.call('getTotalPrensa', searchString.get(), function(err, res){
            if(res){
                totalPages.set(Math.ceil(res/largoDePagina));
                totalPrensa.set(res);
            }
        })
    })

})

Template.prensaAdmin.events({
    'click .addPrensa': function(){
        Modal.show("addPrensaModal");
    },
    'click .btn-remove': function(){
        var id = this._id;
        Modal.show("confirmModal",{title:"Eliminar prensa", texto:"Estas seguro que deseas eliminarla?", actionIfConfirm: function(){
            Meteor.call('prensa.remove', id);
        }});
    },
    'click #edit-prensa': function(){
        var id = this._id;
        Modal.show("addPrensaModal",this);
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


Template.prensaAdmin.helpers({
    'prensa': function(){
        return Prensa.find({},{sort:{fecha:-1}});
    },
    // 'getDate': function(date){
    //     return moment(date).format('DD/MM/YYYY h:mm A');
    // },
    'totalPrensa': function(){
        return totalPrensa.get();
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
