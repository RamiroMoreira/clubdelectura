import './addActivityModal.html';
import { Template } from 'meteor/templating'
import { Colaboradores} from '/imports/api/colaboradores/colaboradores.js';

var nombreActividad = new ReactiveVar("");
var fechaInicio = new ReactiveVar("");
var fechaFin = new ReactiveVar("");
var texto = new ReactiveVar("");
var actividadId = new ReactiveVar("");
var dibujoInicial = new ReactiveVar("");

var dibujosElejibles = [{value:"librocasa", displayName:"Libro casa"},{value:"teconmedialunas", displayName:"Te con medialunas"},{value:"dragon", displayName:"Dragon"}, {value:"quiroga", displayName:"Quiroga"},  {value:"libroclub", displayName:"Libro Club de lectura"}]
var dibujosRandom = ["teconmedialunas","dragon", "libroclub", "librocasa"];
var colaboradoresActividad = [];
var colaboradoresActividadDepend = new Tracker.Dependency;



Template.addActivityModal.created = function(){
    Meteor.subscribe('colaboradores');
    if(this.data && this.data._id){
       actividadId.set(this.data._id);
       fechaInicio.set(this.data.inicio);
       fechaFin.set(this.data.fin);
       texto.set(this.data.texto);
       nombreActividad.set(this.data.nombre)
       dibujoInicial.set(this.data.dibujo)
       if(this.data.colaboradores){
           colaboradoresActividad = this.data.colaboradores
       }
       else{
         colaboradoresActividad = [];
       }
       colaboradoresActividadDepend.changed();
     }
     else{
       dibujoInicial.set("")
       actividadId.set("");
       fechaInicio.set("");
       fechaFin.set("");
       texto.set("")
       nombreActividad.set("");
       var random = _.random(0,dibujosRandom.length-1);
       console.log(random);
       dibujoInicial.set(dibujosRandom[random]);
       colaboradoresActividad = [];
       colaboradoresActividadDepend.changed();
    }
}


Template.addActivityModal.rendered=function() {
  if(fechaInicio.get()){
    this.$('#datetimepickerInicio').datetimepicker({defaultDate:fechaInicio.get(), format:"DD/MM/YYYY h:mm A"});

  }
  else{
    this.$('#datetimepickerInicio').datetimepicker({format:"DD/MM/YYYY h:mm A"});
  }

  if(fechaInicio.get()){
    this.$('#datetimepickerFin').datetimepicker({defaultDate:fechaFin.get(), format:"DD/MM/YYYY h:mm A"});

  }
  else{
    this.$('#datetimepickerFin').datetimepicker({format:"DD/MM/YYYY h:mm A"});

  }

}

Template.addActivityModal.helpers({
  'nombreActividad': function(){
     return nombreActividad.get();
  },
  'textoActividad' : function(){
    return texto.get();
  },
  'dibujos' : function(){
    return dibujosElejibles;
  },
  'dibujoInicial' : function(){
    if(dibujoInicial.get() == this.value){
      return "selected";
    };
  },
  'colaborador' : function(){
    colaboradoresActividadDepend.depend();
    var arrayId = [];
    _.each(colaboradoresActividad, function(col){
        arrayId.push(col._id);
    })
    if(Colaboradores.find({_id:{$nin:arrayId}}).count() == 0){
      return false;
    }
    else{
      return Colaboradores.find({_id:{$nin:arrayId}});
    }
  },
  'colaboradoresActividad': function(){
      colaboradoresActividadDepend.depend();
      if(colaboradoresActividad === []){
        return false;
      }
      return colaboradoresActividad;
  }
})

Template.addActivityModal.events({
  'change #nombreActividad': function(e){
    nombreActividad.set(e.target.value);
  },
  'change #selectDibujo': function(e){
    dibujoInicial.set(e.target.value);
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
  'change #textoActividad': function(e){
    texto.set(e.target.value);
  },
  'click .save-btn': function(e){
    var stringFechaInicio = $('#datetimepickerInicio')[0].value;
    if(stringFechaInicio) {
      fechaInicio.set(moment($('#datetimepickerInicio')[0].value, "DD/MM/YYYY h:mm A").toDate());
    }


    if($('#datetimepickerFin')[0].value) {
      fechaFin.set(moment($('#datetimepickerFin')[0].value, "DD/MM/YYYY h:mm A").toDate());
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

    if(texto.get()){
      nuevaActividad.texto = texto.get();
    }
    if(actividadId.get()){
      nuevaActividad._id = actividadId.get();
    }

    if(dibujoInicial.get()){
        nuevaActividad.dibujo = dibujoInicial.get();
    }

    nuevaActividad.colaboradores = colaboradoresActividad;

    console.log(nuevaActividad.dibujo)
    if(actividadId.get()){
      Meteor.call('actividades.update', nuevaActividad, function(err, res){
        Modal.hide();
      })
    }
    else{
      Meteor.call('actividades.insert', nuevaActividad, function(err, res){
        Modal.hide();
      })  
    }
  },
  'click .add-colaborador':function(){
    var colaboradorId = $("#selectColaborador").val();
    var colaborador = Colaboradores.findOne({_id:colaboradorId});
    colaboradoresActividad.push(colaborador);
    colaboradoresActividadDepend.changed();
  },
  'click .remove-colaborador': function(){
    var newArray = [];
    var self = this;
    _.each(colaboradoresActividad, function(col){
        if(col._id != self._id){
            newArray.push(col)
        }
    })
    colaboradoresActividad = newArray;
    colaboradoresActividadDepend.changed();
  }
})