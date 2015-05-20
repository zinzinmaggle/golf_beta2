Accounts.onCreateUser(function(options, user){

	user.level = '1';
	user.experience = '50';
	user.experienceTotale ='100';
	user.firstConnexion = '1';



	if(options.profile)
		user.profile['level'] = options.level,
		user.profile['experience'] = options.experience,
		user.profile['experienceTotale'] = options.experienceTotale,
		user.profile['encryptedMail'] = options.encryptedMail,
		user.profile['firstConnexion'] = options.firstConnexion

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
