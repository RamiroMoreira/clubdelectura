import './addActivityModal.html';
import { Template } from 'meteor/templating'

Template.addActivityModal.rendered=function() {
  this.$('#datetimepickerFin').datetimepicker();
  this.$('#datetimepickerInicio').datetimepicker();

}

Template.addActivityModal.events({
  // 'click #datetimepicker4':.datetimepicker();'
})