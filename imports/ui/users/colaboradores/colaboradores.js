import './colaboradores.html'
import { Colaboradores} from '/imports/api/colaboradores/colaboradores.js';


Template.colaboradores.created = function(){
    Meteor.subscribe('colaboradores');
}

Template.colaboradores.helpers({
    'colaboradores': function(){
        return Colaboradores.find();
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }
})

Template.colaboradores.events({
    'click .colaborador-link': function(){
        if(!window.localStorage.getItem('achivementCuriosidad')) {
            if (window.localStorage.getItem("curiosityStat")) {
                var curiosityStat = window.localStorage.getItem("curiosityStat");
                curiosityStat++;
                window.localStorage.setItem("curiosityStat", curiosityStat);
            }
            else {
                window.localStorage.setItem("curiosityStat", 1);
            }
            if (curiosityStat == 3) {
                Modal.show("newAchivementModal", {
                    title: "New achivement unlocked!",
                    texto: "Felicidades amigo curioso! Has entrado a las paginas de 3 aliados.",
                    icon: "../inspiracion_desbloqueado.png"
                })
                window.localStorage.setItem('achivementCuriosidad', true);
            }
        }
    }
})