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
				firstName: "",
				lastName : "",
				gender : "",
				phone : "",
				adresse : "",
				codePostal : "",
				ville : "",
				nationalite : "",
				handicape : "",
			}
		});
		
		Posts.insert({
		title: Meteor.user().username,
		subtitle : '− à rejoint l\'application',
		content : '',
		author : Meteor.user().username,
		submit_date : new Date(),
		type : 'statut',
		encrypted_mail : Meteor.user().encryptedMail,
		id : Meteor.userId(),
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