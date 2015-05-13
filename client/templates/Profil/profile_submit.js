

Meteor.subscribe('users');
Template.ProfileForm.events({
  'submit form': function(e) {
    e.preventDefault();

  
	Meteor.users.update({_id:Meteor.user()._id}, {$set: { surname: $(e.target).find('[name=username]').val()
	/*firstname: $(e.target).find('[name=fname]').val(),
	lastname: $(e.target).find('[name=lname]').val(),
    level : 'beginner',
    accounttype : 'regular'*/
	}});
    Router.go('postsList');
  }
});

Deps.autorun(function(){

	Meteor.subscribe('userData');
});

Template.userProfil.helpers({
  users: function() {
    return Meteor.users.find();
  }
});