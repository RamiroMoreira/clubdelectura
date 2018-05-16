import '/imports/ui/users/templatesImages/tipitaalsol.html'
import './textActivity.js'

var timeout;
Template.tipitaalsol.helpers({
    esPar: function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }

})

Template.tipitaalsol.events({
    'mouseenter .walkman': function () {
        timeout = Meteor.setTimeout(function(){
            window.open("https://open.spotify.com/user/lidnele/playlist/4jGzTuY8NY1I7IuVRQQPbv",'_blank');
            if(!window.localStorage.getItem('AchivementSpotify')) {

                Modal.show("newAchivementModal", {
                    title: "New achivement unlocked!",
                    texto: "Has desbloqueado inspiración!",
                    icon: "../inspiracion_desbloqueado.png"
                })
                window.localStorage.setItem('AchivementSpotify', true);
            }
        },3000)
    },
    'mouseleave .walkman': function () {
        Meteor.clearTimeout(timeout);
    }
})