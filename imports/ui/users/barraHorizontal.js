import './barraHorizontal.html'
var active = new ReactiveVar();
var hasAchivements = new ReactiveVar()
Template.barraHorizontal.onCreated(function(){
    active.set(this.data.active);
    var ventana = window;
    Meteor.setInterval(function(){
        hasAchivements.set(ventana.localStorage.getItem('AchivementSpotify') ||
            ventana.localStorage.getItem('AchivementIlustrado') ||
            ventana.localStorage.getItem('AchivementSatie') ||
            ventana.localStorage.getItem('AchivementEvilMorty') ||
            ventana.localStorage.getItem('achivementCuriosidad'))

    },1000)
})

Template.barraHorizontal.helpers({
    'active': function(item){
        return active.get() == item;
    },
    'hasAchivement': function(){
        return hasAchivements.get();

    }
})


Template.barraHorizontalMovil.onCreated(function(){
    active.set(this.data.active);
})

Template.barraHorizontalMovil.helpers({
    'active': function(item){
        return active.get() == item;
    }
})