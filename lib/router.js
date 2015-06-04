var subs = new SubsManager();

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/network/news', {
	name: 'postsList',
	waitOn: function(){ 
		return [Meteor.subscribe('users'),Meteor.subscribe('friends'),Meteor.subscribe('posts',Meteor.userId())];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Fil d\'actualités');
		this.next();
	}
});

Router.route('/explorer/golf-search', {
	name: 'golfSearch',
	waitOn: function() { return subs.subscribe('golf'); },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Carte des Golfs');
		GoogleMaps.load({key: 'AIzaSyCYf9huscpS6KHyK-nkTbIxl4_mEcKAyGA'});
		this.next();
	}
});

Router.route('/explorer/golf/:_id', {
	name: 'golfPage',
	waitOn: function() { return subs.subscribe('golf'); }
});

Router.route('/network/userProfil', {
	name: 'userProfil',
	data: function() { 
		return Meteor.user(this.params._id);
	},
	waitOn : function() { return subs.subscribe('users'); },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Profil');
		this.next();
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

Router.route('/explorer/friend-search', {
	name: 'search_friends',
	waitOn : function(){
		return [Meteor.subscribe('users'),Meteor.subscribe('friends')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Retrouver des amis');
		this.next();
	}
});

Router.route('/network/my-friends', {
	name: 'showFriends',
	waitOn : function(){
		return [Meteor.subscribe('friends'),Meteor.subscribe('users')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Amis');
		this.next();
	}
});
Router.route('/others/settings', {
	name: 'settings',
	data: function() { 
		return Meteor.user(this.params._id);
	},
	waitOn : function() { return subs.subscribe('users'); },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Paramètres');
		this.next();
	}
}); 
Router.route('/groups/createGroup', {
	name: 'createGroup',
	waitOn : function() { return [Meteor.subscribe('users'),Meteor.subscribe('groups')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Créer un groupe');
		this.next();
	}
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
    
    homeRoutePath: '/news',
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
