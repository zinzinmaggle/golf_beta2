Accounts.onCreateUser(function(options, user){

	user.level = '1';
	user.experience = '50';
	user.experienceTotale ='100';
	user.firstConnexion = '1';
	user.accountType = "regular";
	user.friendsList = [];
	if(options.profile)
	{
		user.profile['level'] = options.level,
		user.profile['experience'] = options.experience,
		user.profile['experienceTotale'] = options.experienceTotale,
		user.profile['encryptedMail'] = options.encryptedMail,
		user.profile['firstConnexion'] = options.firstConnexion,

		user.profile['firstName'] = options.firstName,
		user.profile['lastName'] = options.lastName,
		user.profile['gender'] = options.gender,
		user.profile['phone'] = options.phone,
		user.profile['adresse'] = options.adresse,
		user.profile['codePostal'] = options.codePostal,
		user.profile['ville'] = options.ville,
		user.profile['nationalite'] = options.nationalite,
		user.profile['handicape'] = options.handicape,

		user.profile['accountType'] = options.accountType,
		user.profile['friendsList'] = options.friendsList

	}
	 return user;
});



Meteor.publish('userData', function(){
	if(!this.userId) return null;
	return Meteor.users.find(this.userId, {fields: {
		username :1,
		level : 1,
		experience : 1,
		experienceTotale : 1,
		encryptedMail : 1,
		firstConnexion : 1,
		firstName : 1,
		lastName : 1,
		gender : 1,
		phone : 1,
		adresse : 1,
		codePostal : 1,
		ville : 1,
		nationalite : 1,
		handicape : 1,
		accountType : 1,
		friendsList :1,

	}});
});
Meteor.publish('users', function(){
	
	return Meteor.users.find();
});

if (Meteor.isServer){
    Meteor.methods({
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },
    });
}
