import './galeriaFotos.html';

var titulo = new ReactiveVar("");
var fotos = [];
var fotosDepend = new Tracker.Dependency;


Template.galeriaFotos.onCreated(function(){
    if(this.data.nombre){
        titulo.set(this.data.nombre)
    }
    else if(this.data.titulo){
        titulo.set(this.data.titulo)
    }
    fotos = this.data.fotos
    fotosDepend.changed()
})

Template.galeriaFotos.onRendered(function(){
})

Template.galeriaFotos.helpers({
    'getTitle': function(){
        return titulo.get()
    },
    'fotos': function(){
        fotosDepend.depend();
        var count = 0;
        var arrayFotos = [];
        _.each(fotos, function(f){
            if(count === 0){
                arrayFotos.push({foto: f, count: count, active: true})
            }
            else{
                arrayFotos.push({foto: f, count: count, active: false})
            }
            count++;
        })
        return arrayFotos;
    }
})