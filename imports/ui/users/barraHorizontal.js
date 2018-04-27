import './barraHorizontal.html'
var active = new ReactiveVar();
Template.barraHorizontal.onCreated(function(){
    active.set(this.data.active);
})

Template.barraHorizontal.helpers({
    'active': function(item){
        return active.get() == item;
    }
})