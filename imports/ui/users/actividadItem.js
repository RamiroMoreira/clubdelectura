import './actividadItem.html'
import { Template } from 'meteor/templating';


Template.actividadItem.onRendered(function(){
  var activity = this.data;
  var div = this.find('div.event-timeLine');
  var base = 3000;
  var offset = 1000;

  div.setAttribute("data-0","display:none;top:200%")
  div.setAttribute("data-"+(3000+activity.position*offset),"display:block")
  div.setAttribute("data-"+(3500+activity.position*offset),"display:block;top:0%")
  div.setAttribute("data-"+(4000+activity.position*offset),"top:0%")
  div.setAttribute("data-"+(4500+activity.position*offset),"display:none;top:-100%")
  SK.refresh(div);
});

