import '/imports/ui/admin/adminHome.html';
import '/imports/ui/admin/libros/librosAdmin.js';
import '/imports/ui/users/home.js';
import '/imports/ui/users/notFound.html';
import '/imports/ui/users/archivo/actividadesArchivo.js';
import '/imports/ui/users/achivements/achivements.js';
import '/imports/ui/users/actividad/actividad.js';
import '/imports/ui/users/archivo/librosArchivo.js';
import '/imports/ui/users/archivo/prensaArchivo.js';
import '/imports/ui/users/nosotros/nosotros.js';
import '/imports/ui/users/reseñas/reseñas.js';
import '/imports/ui/users/colaboradores/colaboradores.js';
import '/imports/ui/admin/login/login.js';
import '/imports/ui/admin/navbar.js'
import '/imports/ui/admin/actividades/actividades.js';
import '/imports/ui/admin/prensa/prensaAdmin.js';
import '/imports/ui/admin/quienesSomos/quienesSomosAdmin.js';
import '/imports/ui/admin/aliados/aliados.js';


var OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      this.redirect('/login')
    }else{
      this.next();
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['admin', 'admin.actividades']
});

// Router.configure({
//   // the default layout
//   layoutTemplate: 'mainNav'
// });

Router.route('/', function () {
  this.render('Home');
});

Router.route('/nosotros', function(){
  this.render('Nosotros')
})

Router.route('/archivo/actividades', function(){
    this.render('actividadesArchivo')
})

Router.route('/archivo/libros', function(){
    this.render('librosArchivo')
})

Router.route('/archivo/prensa', function(){
    this.render('prensaArchivo')
})


Router.route('/aliados', function(){
    this.render('colaboradores')
})

Router.route('/actividadInfo/:_id', {controller: 'ActividadController'},function(){

    this.render('actividadInfo')
})
//
Router.route('/admin', function () {
  this.redirect("/admin/actividades")
  this.layout('mainNav');
});

Router.route('/admin/librosAdmin', function () {
    this.redirect("/admin/librosAdmin")
    this.layout('mainNav');
});

Router.route('/login', function () {
  this.render('Login');
});

Router.route('/admin/actividades', function () {
  this.render('actividades');
  this.layout('mainNav');

});

Router.route('/admin/prensa', function () {
    this.render('prensaAdmin');
    this.layout('mainNav');
});

Router.route('/admin/review', function () {
  // this.render('AdminHome');
  this.layout('mainNav');

});

Router.route('/admin/quienesSomos', function () {
  this.render('quienesSomosAdmin');
  this.layout('mainNav');

});

Router.route('/admin/libros', function () {
    this.render('librosAdmin');
    this.layout('mainNav');

});



Router.route('/admin/aliados', function () {
  this.render('aliadosAdmin');
  this.layout('mainNav');

});

Router.route('/admin/contacto', function () {
  // this.render('AdminHome');
  this.layout('mainNav');

});

Router.route('/achievements', function () {
    this.render('achivements');
});

Router.route('/libroFest', function () {
    this.render('libroFest');
});

Router.route('/resenas', function () {
    this.render('reseñas');
});

Router.configure({
    notFoundTemplate: "NotFound"
})

//
Deps.autorun(function () {
    var current = Router.current();

    Deps.afterFlush(function () {
        $('.content-inner').scrollTop(0);
        $(window).scrollTop(0);
    });
});
// Router.setTemplateNameConverter(_.identity);
// AccountsTemplates.configureRoute('signIn');
