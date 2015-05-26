Template.ProfileForm.events({
	'submit form': function(e) {
		e.preventDefault();
	
		Meteor.users.update({
			_id:Meteor.user()._id
		}, {
			$set: { 
				username: $(e.target).find('[name=username]').val()
				firstName: $(e.target).find('[name=fname]').val(),
				lastName: $(e.target).find('[name=lname]').val(),
				accountType : 'regular',
				gender : $(e.target).find('[name=gender]').val(),
				phone : $(e.target).find('[name=phone]').val(),
				adresse : $(e.target).find('[name=adresse]').val(),
				codePostal : $(e.target).find('[name=dpt]').val(),
				ville : $(e.target).find('[name=ville]').val(),
				nationalite : $(e.target).find('[name=nationalite]').val(),
				handicape : $(e.target).find('[name=hdc]').val(),
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
