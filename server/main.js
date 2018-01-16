import { Meteor } from 'meteor/meteor';
import '/imports/api/actividades/actividades.js'
import '/imports/api/textos/textos.js'
import '/imports/api/personas/personas.js'
import '/imports/api/colaboradores/colaboradores.js'
import '/imports/api/markers/markers.js'

Meteor.startup(() => {
    Meteor.users.remove({});
 if(!Meteor.users.findOne()){
   var userId = Accounts.createUser({username:Meteor.settings.AdminName, email:Meteor.settings.AdminEmail, password:Meteor.settings.AdminPass});
   console.log(userId);
   // Meteor.users.update({_id:userId},{$set:{'emails.$.verified':true}});

 }
});
