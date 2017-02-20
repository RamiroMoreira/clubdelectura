import { Template } from 'meteor/templating'
import './login.html';

var reactiveEmail = new ReactiveVar("");
var reactivePassword = new ReactiveVar("");
var error = new ReactiveVar(false)

Template.Login.onCreated(function(){
  reactiveEmail.set("");
  reactivePassword.set("");
  error.set(false);
})

Template.Login.events({
  'click #login-btn': function(){
    Meteor.loginWithPassword(reactiveEmail.get(), reactivePassword.get(), function(err, res){
      if(!err){
        Router.go('/admin')
      }
      else{
        error.set(true)
      }
    })
  },
  'change #email': function(e, ctx){
    error.set(false);
    reactiveEmail.set(e.target.value);
  },
  'change #password': function(e, ctx){
    error.set(false);
    reactivePassword.set(e.target.value);
  },
  'keyup #password': function(e, ctx){
    if(e.keyCode === 13){
      Meteor.loginWithPassword(reactiveEmail.get(), reactivePassword.get(), function(err, res){
        if(!err){
          Router.go('/admin')
        }
        else{
          error.set(true)
        }
      })
    }
  }
})

Template.Login.helpers({
  'hasError': function(){
    if(error.get()){
      return "has-error"
    };
  }
})