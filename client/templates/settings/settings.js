Template.settings.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
	},

	
	"click #removeAccount":function(e){
		e.preventDefault();

		Meteor.users.remove({_id: Meteor.userId()});
		Router.go('logout');
	}
});
Template.settings.helpers({
	users: function() {
		return Meteor.users.find();
	},
	currentTab: function() {
		return Session.get('currentTab');
	}
});
