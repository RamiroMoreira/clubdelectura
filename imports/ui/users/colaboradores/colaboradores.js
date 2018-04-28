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