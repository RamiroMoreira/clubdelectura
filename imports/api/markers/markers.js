import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    Queue.setInterval('deleteAllMarkers','Markers.remove({})', 86400000); /* once a day */
    Queue.run();
  });
  Meteor.methods({
    'markers.insert'(marker){
      // check(actividad.nombre, String);
      // check(actividad.inicio, Date);
      // var user;
      // if (! this.userId) {
      //   throw new Meteor.Error('not-authorized');
      // }
      // else{
      //   user = Meteor.users.findOne(this.userId);
      //
      // }
      Markers.insert(marker);
    }
  })
  Meteor.publish('markers', function markersPublication() {
    return Markers.find();
  });
}