import '/imports/ui/users/templatesImages/dragon.html'

Template.dragon.helpers({
  esPar: function(){
      if(this.position % 2 === 0){
          return true;
      }
      else{
          return false;
      }
  }
})