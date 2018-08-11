import './achivements.html'



Template.achivements.created = function(){
}

Template.achivements.helpers({
    'achivements': function(){
        var achivementsList = [];
        var spotify = window.localStorage.getItem('AchivementSpotify') ? true : false;
        achivementsList.push({nombre: 'Inspiración', unlocked: spotify, imageLocked: "inspiracion_bloqueado.png", imageUnlocked:"inspiracion_desbloqueado.png"});
        var flechaDorada = window.localStorage.getItem('AchivementIlustrado') ? true : false;
        achivementsList.push({nombre: 'Flecha dorada', unlocked: flechaDorada, imageLocked: "flechita_bloqueado.png", imageUnlocked: "flechita_desbloqueada.png"});
        var gymnopedie = window.localStorage.getItem('AchivementSatie') ? true : false;
        achivementsList.push({nombre: 'Gymnopédie', unlocked: gymnopedie, imageLocked: "satie_bloqueado.png", imageUnlocked: "satie_desbloqueado.png"});
        var parcheDeVillano = window.localStorage.getItem('AchivementEvilMorty') ? true : false;
        achivementsList.push({nombre: 'Parche de villano', unlocked: parcheDeVillano, imageLocked: "parche_bloqueado.png", imageUnlocked: "parche_desbloqueado.png"});
        var curiosidad = window.localStorage.getItem('achivementCuriosidad') ? true : false;
        achivementsList.push({nombre: 'Curiosidad', unlocked: curiosidad, imageLocked: "inspiracion_bloqueado.png", imageUnlocked:"inspiracion_desbloqueado.png"});
        return achivementsList;
    },
    'isDesktop':function(){
        return !(( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ) || (navigator.userAgent.toLowerCase().indexOf("android") > -1)) ;
    }
})