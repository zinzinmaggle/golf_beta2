Template.ProfileForm.events({
	'click paper-button#submitProfil': function(e) {
		e.preventDefault();
	
		Meteor.users.update({
			_id:Meteor.user()._id
		}, {
			$set: { 
				// username: $(e.target).find('[name=username]').val(),
				firstName: $('[name=fname]').val(),
				lastName: $('[name=lname]').val(),
				accountType : 'regular',
				gender : $('#gender')[0].selectedItem.label,
				phone : $('[name=phone]').val(),
				adresse : $('[name=adresse]').val(),
				codePostal : $('[name=dpt]').val(),
				ville : $('[name=ville]').val(),
				nationalite : $('[name=nationalite]').val(),
				handicape : $('[name=hdc]').val(),
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
