import { Meteor } from 'meteor/meteor';
import '/imports/api/actividades/actividades.js'
import '/imports/api/textos/textos.js'
import '/imports/api/personas/personas.js'


Meteor.startup(() => {
 if(!Meteor.users.findOne()){
   Accounts.createUser({username:"AdminName", email:"admin@hotmail.com", password:"admin123"});
 }
});
