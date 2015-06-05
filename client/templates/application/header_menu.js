Template.header_menu.helpers({
	username: function(){
		if (Meteor.user())
			return Meteor.user().username;
		return '';
	},

	encrypted_mail: function(){
		if (Meteor.user())
			return Meteor.user().encryptedMail;
		return '';
	},
	level: function(){
		if (Meteor.user())
			return Meteor.user().level;
		return '';
	},
});
