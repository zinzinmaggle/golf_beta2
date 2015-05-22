Template.settings.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
	},
});
Template.settings.helpers({
	users: function() {
		return Meteor.users.find();
	},
	currentTab: function() {
		return Session.get('currentTab');
	}
});
