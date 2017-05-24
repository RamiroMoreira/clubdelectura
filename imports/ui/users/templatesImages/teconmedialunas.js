import '/imports/ui/users/templatesImages/teconmedialunas.html'



Template.teconmedialunas.helpers({
    esPar: function(){
        if(this.position % 2 === 0){
            return true;
        }
        else{
            return false;
        }
    }
})