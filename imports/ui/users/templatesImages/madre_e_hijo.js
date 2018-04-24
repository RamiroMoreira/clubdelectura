import '/imports/ui/users/templatesImages/madre_e_hijo.html'
import './textActivity.js'

Template.madre_e_hijo.helpers({
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