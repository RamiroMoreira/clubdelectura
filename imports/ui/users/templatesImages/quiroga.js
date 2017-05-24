import '/imports/ui/users/templatesImages/quiroga.html'

Template.quiroga.helpers({
    esPar: function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    }
})