if(Meteor.users.initEasySearch('username'));

Template.searchFriends.helpers({
	users: function() {
		return Meteor.users.find();
	}
});

