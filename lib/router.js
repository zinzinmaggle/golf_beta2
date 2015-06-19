var subs = new SubsManager();

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/network/news', {
	name: 'postsList',
	waitOn: function(){ 
		return [Meteor.subscribe('users'),Meteor.subscribe('friends'),Meteor.subscribe('posts',Meteor.userId()),Meteor.subscribe('groups'),Meteor.subscribe('likeposts'),Meteor.subscribe('commentposts')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Fil d\'actualités');
		this.next();
	}
});

Router.route('/explorer/golf-search', {
	name: 'golfSearch',
	waitOn: function() { return [subs.subscribe('golf'),Meteor.subscribe('groups')] },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Carte des Golfs');
		GoogleMaps.load({key: 'AIzaSyCYf9huscpS6KHyK-nkTbIxl4_mEcKAyGA'});
		this.next();
	}
});

Router.route('/explorer/golf/:_id', {
	name: 'golfPage',
	data: function() { 
		var golf = Golf.findOne(this.params._id),
			courses = Course.find({golf: this.params._id}).fetch();

		return {golf: golf, courses: courses};
	},
	waitOn: function() { return [subs.subscribe('golf'), subs.subscribe('course'), Meteor.subscribe('groups')]; }
});
Router.route('/network/userProfil', {
	name: 'userProfil',
	data: function() { 
		return Meteor.user(this.params._id);
	},
	waitOn : function() {return [ Meteor.subscribe('users'),Meteor.subscribe('stuff'),Meteor.subscribe('groups')]},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Profil');
		this.next();
	}
});
Router.route('/network/events', {
	name:'events',
	waitOn : function() {return [ Meteor.subscribe('users'),subs.subscribe('golf'),Meteor.subscribe('groups'),Meteor.subscribe('posts')]},
	onBeforeAction:function(){
		Session.set('pageTitle', 'Evènements');
		this.next();
	}
});
Router.route('/', {
	name: 'index',
	layoutTemplate: 'layoutOffline',
});

Router.route('/logout', function() {
		Meteor.logout();
		AccountsTemplates.logout();
		Router.go('index');
	}, {
	name: 'logout',
});

Router.route('/explorer/friend-search', {
	name: 'search_friends',
	waitOn : function(){
		return [Meteor.subscribe('users'),Meteor.subscribe('friends'),Meteor.subscribe('groups')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Retrouver des amis');
		this.next();
	}
});

Router.route('/network/my-friends', {
	name: 'showFriends',
	waitOn : function(){
		return [Meteor.subscribe('friends'),Meteor.subscribe('users'),Meteor.subscribe('groups')];
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
	waitOn : function() { return [subs.subscribe('users'),Meteor.subscribe('groups')] },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Paramètres');
		this.next();
	}
});
Router.route('/others/contacts', {
	name: 'contacts',
	waitOn : function() { return [subs.subscribe('users'),Meteor.subscribe('groups')] },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Nous contacter');
		this.next();
	}
});  
Router.route('/groups/createGroup', {
	name: 'createGroup',
	waitOn : function() { return [Meteor.subscribe('users'),Meteor.subscribe('groups'),Meteor.subscribe('jgroup')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Centre de gestion');
		this.next();
	}
});
Router.route('/groups/joinGroup', {
	name: 'joinGroup',
	waitOn : function() { return [Meteor.subscribe('users'),Meteor.subscribe('groups'),Meteor.subscribe('jgroup')];
	},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Rejoindre un groupe');
		this.next();
	}
});
Router.route('/network/gallery', {
	name: 'gallery',
	waitOn : function() { return [subs.subscribe('users'),Meteor.subscribe('gallery'),Meteor.subscribe('groups')] },
	onBeforeAction: function() {
		Session.set('pageTitle', 'Mes Photos/Vidéos');
		this.next();
	}
}); 


Router.route('/groups/chatGroup/:_id', {
	name: 'chatGroup',
	data: function() { return Groups.findOne(this.params._id); },
	waitOn : function(){return [Meteor.subscribe('groups'),Meteor.subscribe('users')]},
	onBeforeAction: function() {
		Session.set('pageTitle', 'Chat');
		Session.set('chapp-docid', Groups.findOne(this.params._id));
		this.next();
	}
}); 
Router.route('/groups/postsGroup/:_id',{
	name: 'postsGroup',
	data: function() { return Groups.findOne(this.params._id); },
	waitOn : function(){return [Meteor.subscribe('groups'),Meteor.subscribe('users'),Meteor.subscribe('postsgroup'),Meteor.subscribe('commentpostsgroup'),Meteor.subscribe('likepostsgroup')]},
	onBeforeAction: function() {
		Session.set("pageTitle", "Fil d\'actualités du groupe");
		this.next();
	}
});

AccountsTemplates.configureRoute('forgotPwd', {
    name: 'atForgotPwd',
    path: '/forgot-password',
    template: 'forgotPassword',
	layoutTemplate: 'layoutOffline',
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'login',
	layoutTemplate: 'layoutOffline'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    layoutTemplate: 'layoutOffline',
    redirect: 'postsList',
});

AccountsTemplates.configureRoute('signUp', {
    name: 'register',
    path: '/register',
    template: 'register',
    layoutTemplate: 'layoutOffline',
    redirect: 'postsList',
});



var logoutHook = function () {
	Router.go('index');
}

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
    
    homeRoutePath: '/network/news',
    redirectTimeout: 4000,
    onLogoutHook: logoutHook,
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
    except: ['index', 'login', 'register','atForgotPwd', 'logout']
});
