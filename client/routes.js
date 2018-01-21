import '/imports/ui/admin/adminHome.html';
import '/imports/ui/users/home.js';
import '/imports/ui/users/archivo/actividadesArchivo.js';
import '/imports/ui/users/nosotros/nosotros.js';
import '/imports/ui/users/colaboradores/colaboradores.js';
import '/imports/ui/admin/login/login.js';
import '/imports/ui/admin/navbar.js'
import '/imports/ui/admin/actividades/actividades.js';
import '/imports/ui/admin/quienesSomos/quienesSomosAdmin.js';
import '/imports/ui/admin/aliados/aliados.js';
import '/imports/ui/libraryOrganizer/libraryOrganizer.js';


var OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      this.redirect('/login')
    }else{
      // userInfo = Utils.getUserInformation(Meteor.userId());
      // if(userInfo) {
      //   TAPi18n.setLanguage(userInfo.language);
      // }
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

Router.route('/colaboradores', function(){
    this.render('Colaboradores')
})
//
Router.route('/admin', function () {
  this.redirect("/admin/actividades")
  this.layout('mainNav');

});

Router.route('/login', function () {
  this.render('Login');
});

Router.route('/admin/actividades', function () {
  this.render('actividades');
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

Router.route('/libraryOrganizer', function(){
  this.render('libraryOrganizer')
})


// Router.setTemplateNameConverter(_.identity);
// AccountsTemplates.configureRoute('signIn');
