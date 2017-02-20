import '/imports/ui/admin/adminHome.html';
import '/imports/ui/users/home.html';


Router.route('/', function () {
  this.render('Home');
});
//
Router.route('/admin', function () {
  this.render('AdminHome');
});
// Router.setTemplateNameConverter(_.identity);
