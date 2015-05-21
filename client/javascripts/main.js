// Meteor.users.update({_id:Meteor.user()._id}, {$set: { surname: ""
// 	}});
Deps.autorun(function () {
  if (Meteor.user())
  {
  		if(Meteor.user().firstConnexion == '1'){
  		var em = CryptoJS.MD5(Meteor.user().emails[0].address).toString();
		Meteor.users.update({
			_id:Meteor.user()._id
		}, {
			$set: { 
				encryptedMail: em,
				firstConnexion: '0',
			}
		});
	}
	else
	{
		Meteor.users.update({
			_id:Meteor.user()._id
		}, {
			$set: { 
				firstConnexion: '0',
			}
		});
	}
  }
 
});