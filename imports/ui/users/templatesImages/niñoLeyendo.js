import '/imports/ui/users/templatesImages/niñoLeyendo.html'
import './textActivity.js'
// var audio;
var evilMorty = new ReactiveVar(false)
morty = new ReactiveVar(false);

Template.niñoLeyendo.helpers({
    esPar: function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    },
    'getImageURL': function(){
        return 'nino_leyendo.png'
    },
    'evilMorty': function(){
        return evilMorty.get();
    }
})

Template.niñoLeyendo.events({
    'click .morty': function(){
            audio = new Audio('morty.mp3');
            audio.loop = false;
            audio.play()
            morty = new ReactiveVar(false);
        var scrollY = window.scrollY;
        Meteor.setTimeout(function(){
            window.scrollTo(0, scrollY);
            evilMorty.set(true);
            morty.set(true);
        },27750)
        Meteor.setTimeout(function(){
            evilMorty.set(false);
            morty.set(false);
            if(!window.localStorage.getItem('AchivementEvilMorty')) {
                Modal.show("newAchivementModal", {
                    title: "New achivement unlocked!",
                    texto: "Has desbloqueado un parche de villano!",
                    icon: "../parche_desbloqueado.png"
                })
                window.localStorage.setItem('AchivementEvilMorty', true);
            }
        },52000)
    }
})