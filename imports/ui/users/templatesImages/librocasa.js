import '/imports/ui/users/templatesImages/librocasa.html'

Template.librocasa.helpers({
    esPar: function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    }
})