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

Router.route('/searchFrds', {
	name: 'search_friends',
	waitOn : function(){return Meteor.subscribe('friends');}
});

Router.route('/showFriends', {
	name: 'showFriends',
	waitOn : function(){return Meteor.subscribe('friends');}
});



AccountsTemplates.configureRoute('forgotPwd', {
    name: 'atForgotPwd',
    path: '/forgot-password',
    template: 'forgotPassword',
    
});

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    hideSignInLink:true,
    hideSignUpLink:true,
    
    homeRoutePath: '/',
    redirectTimeout: 4000,
    
    
    
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

Router.onBeforeAction(alreadyLogged, {only: ['index', 'login', 'register','atForgotPwd']});

Router.plugin('ensureSignedIn', {
    except: ['index', 'login', 'register','atForgotPwd']
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'login'
});
