Template.contacts.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
	},
	'click #sendReport' :function(e){
	 	e.preventDefault();
	 	Meteor.call("SendEmail", Meteor.userId(), $('[name=Eadresse]').val());
	}
});
Template.contacts.rendered = function(){
	
}
Template.contacts.helpers({
	users: function() {
		return Meteor.users.find();
	},
	currentTab: function() {
		return Session.get('currentTab');
	}

});
