Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/news', {
	name: 'postsList'
});

Router.route('/userProfil', {
	name: 'userProfil',
	data: function() { 
		return Meteor.user(this.params._id);
	}
});

Router.route('/', {
	name: 'index'
});

Router.route('/logout', function() {
	Meteor.logout();
	Router.go('index');
});

Router.route('/register', {
	name: 'register'
});

Router.route('/login', {
	name: 'login'
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

Router.onBeforeAction(alreadyLogged, {only: ['index', 'login', 'register']});

Router.plugin('ensureSignedIn', {
    except: ['index', 'login', 'register']
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'login'
});
