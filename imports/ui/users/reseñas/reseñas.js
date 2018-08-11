import './reseñas.html'
import { Resenas} from '/imports/api/reseñas/reseñas.js';

var ultimosPost = [];
var dependencyUltimosPost =  new Tracker.Dependency;
Template.reseñas.onCreated(function(){
    ultimosPost = []
    Meteor.subscribe('resenas');

})

Template.reseñas.helpers({
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    },
    'getPosts': function(){
        return Resenas.find({},{sort:{updated:-1}})
    },
    'getUpdate': function(){
        if(this.updated) {
            return moment(this.updated).format('DD/MM/YYYY h:mm A');
        }
        else{
            return false;
        }
    }
})