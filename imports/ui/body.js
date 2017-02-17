import { Template } from 'meteor/templating';
import './body.html';
import {Reunions} from '/imports/api/reunions/reunions.js';


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  reunions(){
    return Reunions.find().fetch();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.addReunion.events({
  'submit .add-Reunion':function(e){
    e.preventDefault();
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Reunions.insert({
      text: text,
      createdAt: new Date() // current time
    });
  }
})