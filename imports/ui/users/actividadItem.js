import './actividadItem.html'
import { Template } from 'meteor/templating';
import '/imports/ui/textualize.js';



Template.actividadItem.onRendered(function(){

  var activity = this.data;
  var div = this.find('div.event-timeLine');
  var base = 2900;
  var offset = 900;

  div.setAttribute("data-0","display:none;top:200%")
  div.setAttribute("data-"+(base+activity.position*offset),"display:block")
  div.setAttribute("data-"+(base+500+activity.position*offset),"display:block;top:0%")
  div.setAttribute("data-"+(base+1000+activity.position*offset),"top:0%")
  div.setAttribute("data-"+(base+1500+activity.position*offset),"display:none;top:-100%")
  SK.refresh([div]);

  var txt = $('#txtlzr');
  var itemEvent = $('#itemEvent');

  var options = {
        duration: 1, // Time (ms) each blurb will remain on screen
        rearrangeDuration: 1000, // Time (ms) a character takes to reach its position
        effect: 'fadeIn', // Animation effect the characters use to appear
        centered: false, // Centers the text relative to its container
    }
  var test = txt.textualizer(options);
  //   test.on('textualzer.blurbchanged', function(index) {
  //       console.log("WOOOW", index)
  // });

  txt.textualizer('start',options);
  txt.textualizer('pause');
    $(window).on('scroll', function(e, ctx) {
        // ... event processing stuff;
        // say it produces value 'zoomAmount' ...
        if(window.pageYOffset>base+500+activity.position*offset){
            debugger;
            txt.textualizer('start', options);
        }
    })
    // debugger;
    //
    // var waypoint = new Waypoint({
    //     element: document.getElementById('txtlzr'),
    //     handler: function(direction) {
    //         console.log('this hit');
    //         debugger;
    //     }
    // })

  // var waypoints = txt.waypoint()
});

var shuffle = function (texto) {
    var a = texto.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

Template.actividadItem.helpers({
    'getRandomText': function(){
        return shuffle(this.nombre);
    }
})
