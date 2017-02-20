import '/imports/ui/admin/adminHome.html';
import '/imports/ui/users/home.html';
import '/imports/ui/admin/login/login.js';

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
  only: ['admin']
});

Router.route('/', function () {
  this.render('Home');
});
//
Router.route('/admin', function () {
  this.render('AdminHome');
});

Router.route('/login', function () {
  this.render('Login');
});

// Router.setTemplateNameConverter(_.identity);
// AccountsTemplates.configureRoute('signIn');
