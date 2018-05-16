import './hombreIlustradoModal.html';
import '/imports/ui/admin/modals/newAchivementModal.js'

Template.hombreIlustradoModal.onDestroyed(function(){
    Meteor.setTimeout(function(){
        if(!this.localStorage.getItem('AchivementIlustrado')) {
            Modal.show("newAchivementModal", {
                title: "New achivement unlocked!",
                texto: "Has desbloqueado una flecha dorada!",
                icon: "../flechita_desbloqueada.png"
            })
            this.localStorage.setItem('AchivementIlustrado', true);
        }
    },0)
})