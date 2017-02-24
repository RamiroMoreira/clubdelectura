import './addActivityModal.html';
import { Template } from 'meteor/templating'

var nombreActividad = new ReactiveVar("");
var fechaInicio = new ReactiveVar("");
var fechaFin = new ReactiveVar("");
var texto = new ReactiveVar("");
var actividadId = new ReactiveVar("")

Template.addActivityModal.created = function(){
     if(this.data && this.data._id){
       actividadId.set(this.data._id);
       fechaInicio.set(this.data.inicio);
       fechaFin.set(this.data.fin);
       texto.set(this.data.texto);
       nombreActividad.set(this.data.nombre)
     }
     else{
       actividadId.set("");
       fechaInicio.set("");
       fechaFin.set("");
       texto.set("")
       nombreActividad.set("");
     }

}


Template.addActivityModal.rendered=function() {
  this.$('#datetimepickerFin').datetimepicker();
  this.$('#datetimepickerInicio').datetimepicker();

}

Template.addActivityModal.helpers=function(){
  
}

Template.addActivityModal.events({
   //https://github.com/CollectionFS/Meteor-CollectionFS
  'change #nombreActividad': function(e){
    nombreActividad.set(e.target.value);
  },
  'change #datetimepickerInicio': function(e){
    if(e.target.value){
      var arrayDate = split(" ", e.target.value);
      var nuevaDate = new Date(arrayDate[0]);
      var hour = Number(arrayDate[1]);
      if(arrayDate[2] === "PM"){
          hour = hour + 12;
      }
      nuevaDate.setHours(hour);
      fechaInicio.set(nuevaDate);
    }
  },
  'change #datetimepickerFin': function(e){
    if(e.target.value){
      var arrayDate = split(" ", e.target.value);
      var nuevaDate = new Date(arrayDate[0]);
      var hour = Number(arrayDate[1]);
      if(arrayDate[2] === "PM"){
        hour = hour + 12;
      }
      nuevaDate.setHours(hour);
      fechaFin.set(nuevaDate);
    }
  },
  'dropped #dropzone': function(e) {
    console.log('dropped a file');
    //http://experimentsinmeteor.com/photo-blog-part-1/
  },
  'change #textoActividad': function(e){
    texto.set(e.target.value);
  },
  'click .save-btn': function(e){
    var stringFechaInicio = $('#datetimepickerInicio')[0].value;
    if(stringFechaInicio) {
      var arrayDate = stringFechaInicio.split(" ");
      var nuevaDate = new Date(stringFechaInicio);
      var hour = Number(arrayDate[1].split(":")[0]);
      var minutes = Number(arrayDate[1].split(":")[1])
      if (arrayDate[2] === "PM") {
        hour = hour + 12;
      }
      nuevaDate.setHours(hour);
      nuevaDate.setMinutes(minutes);
      fechaInicio.set(nuevaDate);
    }


    if($('#datetimepickerFin')[0].value) {
      var arrayDateFin = $('#datetimepickerFin')[0].value.split(" ");
      var nuevaDateFin = new Date($('#datetimepickerFin')[0].value);
      var hourFin = Number(arrayDateFin[1].split(":")[0]);
      var minutesFin = Number(arrayDateFin[1].split(":")[1])
      if (arrayDateFin[2] === "PM") {
        hourFin = hourFin + 12;
      }
      nuevaDateFin.setHours(hourFin);
      nuevaDateFin.setMinutes(minutesFin);
      fechaFin.set(nuevaDateFin);
    }

    var nuevaActividad = {}
    if(nombreActividad.get()){
      nuevaActividad.nombre = nombreActividad.get();
    }
    if(fechaInicio.get()){
      nuevaActividad.inicio = fechaInicio.get();
    }
    if(fechaFin.get()){
      nuevaActividad.fin = fechaFin.get();
    }
    if(fechaFin.get()){
      nuevaActividad.fin = fechaFin.get();
    }
    if(texto.get()){
      nuevaActividad.texto = texto.get();
    }
    
    Meteor.call('actividades.insert', nuevaActividad, function(err, res){
      Modal.hide();
    })
    
  }
})