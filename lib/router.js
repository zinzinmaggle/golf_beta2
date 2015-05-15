Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {
	name: 'postsList'
});

Router.route('/userProfil', {
	name: 'userProfil',
	data: function() { 
		return Meteor.user(this.params._id);
	}
});

Router.route('/login', function() {
	this.render('login');
	
});

Router.route('/logout', function() {
	Meteor.logout();
	Router.go('index');
});

Router.route('/connexion', {
	name: 'connexion'
});

var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			Router.go('login');

		this.stop();
	} else {
		this.next();
	}
}



var alreadyLogged = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);

		this.next();
	} else {
		Router.go('postsList');
	}
}




/*Router.onBeforeAction(requireLogin, {except: ['login']});*/
Router.onBeforeAction(alreadyLogged, {only: 'login'});
