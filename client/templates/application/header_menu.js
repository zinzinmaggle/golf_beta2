Template.header_menu.helpers({
	username: function(){
		return Meteor.user().username;
	},

	encrypted_mail: function(){
		var em = CryptoJS.MD5(Meteor.user().emails[0].address).toString();
		return em;
	},
	level: function(){
		return Meteor.user().level;
	},
});
