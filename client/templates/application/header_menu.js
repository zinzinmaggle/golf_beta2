Template.header_menu.helpers({
	username: function(){
		return Meteor.user().username;
	},

	encrypted_mail: function(){
		return Meteor.user().encryptedMail;
	},
	level: function(){
		return Meteor.user().level;
	},
});
