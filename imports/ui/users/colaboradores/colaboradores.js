import './colaboradores.html'
import { Colaboradores} from '/imports/api/colaboradores/colaboradores.js';


Template.colaboradores.created = function(){
    Meteor.subscribe('colaboradores');
}

Template.colaboradores.helpers({
    'colaboradores': function(){
        return Colaboradores.find();
    }
})