import '/imports/ui/admin/adminHome.html';
import '/imports/ui/users/home.html';
import '/imports/ui/admin/login/login.js';
import '/imports/ui/admin/navbar.js'
import '/imports/ui/admin/actividades/actividades.js';

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
//
Router.route('/admin', function () {
  this.render('AdminHome');
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
  // this.render('AdminHome');
  this.layout('mainNav');

});

Router.route('/admin/aliados', function () {
  // this.render('AdminHome');
  this.layout('mainNav');

});

Router.route('/admin/contacto', function () {
  // this.render('AdminHome');
  this.layout('mainNav');

});

// Router.setTemplateNameConverter(_.identity);
// AccountsTemplates.configureRoute('signIn');
