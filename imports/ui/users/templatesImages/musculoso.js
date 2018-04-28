import '/imports/ui/users/templatesImages/musculoso.html'
import './textActivity.js'

Template.musculoso.onCreated(() => {
    $(document).on('keyup', (e) => {
        console.log(e.key)
        if(window.localStorage.getItem('estadoMusculoso') == "ArrowDown"){
           if(e.key == "ArrowLeft"){
               window.localStorage.setItem('estadoMusculoso', "ArrowLeft")
           }
        }
        else if(window.localStorage.getItem('estadoMusculoso') == "ArrowLeft"){
            if(e.key == "ArrowRight")
            window.localStorage.setItem('estadoMusculoso', "ArrowRight")
        }
        else if(window.localStorage.getItem('estadoMusculoso') == "ArrowRight"){
            if(e.key == "x"){
                alert("You fucking win")
                window.localStorage.setItem('estadoMusculoso', "");
            }
        }
        else{
            if(e.key == "ArrowDown"){
                window.localStorage.setItem('estadoMusculoso', "ArrowDown");
                Meteor.setTimeout(function(){
                    window.localStorage.setItem('estadoMusculoso', "");
                },2000)
            }
        }
    });
});
Template.musculoso.onDestroyed(() => {
    $(document).off('keyup');
});

Template.musculoso.helpers({
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

Template.musculoso.events({

})