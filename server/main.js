import { Meteor } from 'meteor/meteor';
import '../imports/api/reunions/reunions.js';

Meteor.startup(() => {
 if(!Meteor.users.findOne()){
   Accounts.createUser({username:"AdminName", email:"admin@hotmail.com", password:"admin123"});
 }
});
