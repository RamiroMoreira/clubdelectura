import './hombreIlustradoModal.html';
import '/imports/ui/admin/modals/newAchivementModal.js'

Template.hombreIlustradoModal.onDestroyed(function(){
    var self = this;
    Meteor.setTimeout(function(){
        Modal.show("newAchivementModal",{title:"New achivement unlocked!", texto:"Has desbloqueado una flecha dorada!",icon:"../flechita_desbloqueada.png"})
        

    },0)
})