import './addActivityModal.html';
import { Template } from 'meteor/templating'

Template.addActivityModal.rendered=function() {
  $('#my-datepicker').datepicker({
    format: "dd/mm/yyyy"
  });
}