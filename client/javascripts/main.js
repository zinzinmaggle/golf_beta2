Meteor.users.update({_id:Meteor.user()._id}, {$set: { surname: ""
	}});