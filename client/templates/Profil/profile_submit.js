Template.ProfileForm.events({
	'submit form': function(e) {
		e.preventDefault();
	
		Meteor.users.update({
			_id:Meteor.user()._id
		}, {
			$set: { 
				username: $(e.target).find('[name=username]').val()
				/*firstname: $(e.target).find('[name=fname]').val(),
				lastname: $(e.target).find('[name=lname]').val(),
					level : 'beginner',
					accounttype : 'regular'*/
			}
		});

		Router.go('postsList');
	}
});
Template.userProfil.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
	},
});
Deps.autorun(function(){
	Meteor.subscribe('userData');
});

Template.userProfil.helpers({
	users: function() {
		return Meteor.users.find();
	},
	currentTab: function() {
		return Session.get('currentTab');
	}
});
