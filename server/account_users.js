Accounts.onCreateUser(function(options, user){
	if(options.profile)
		user.profile = options.profile;
	return user;
	/*user.profile['firstname'] = options.firstname,
	user.profile['lastname'] = options.lastname,
	user.profile['level'] = options.level,
	user.profile['accounttype'] = options.accounttype*/
});

Meteor.publish('userData', function(){
	if(!this.userId) return null;
	return Meteor.users.find(this.userId, {fields: {
		username :1,
	}});
});

if (Meteor.isServer){
    Meteor.methods({
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },
    });
}
