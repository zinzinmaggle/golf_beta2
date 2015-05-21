Template.searchFriends.helpers({
	users: function() {
		return Meteor.users.find();
	}
});

