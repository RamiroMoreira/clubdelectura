import '/imports/ui/users/templatesImages/libroclub.html'

Template.libroclub.helpers({
    esPar: function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    }
})