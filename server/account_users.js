Accounts.onCreateUser(function(options, user){
	if(options.profile)
		user.profile = options.profile;

	/*user.profile['firstname'] = options.firstname,
	user.profile['lastname'] = options.lastname,
	user.profile['level'] = options.level,
	user.profile['accounttype'] = options.accounttype*/
	if(user.services.twitter) {
  		 user.username = user.services.twitter.screenName;
   		 user.avatar = user.services.twitter.profile_image_url;
 	}
 
	if(user.services.facebook) {
	   user.username = user.services.facebook.name;
	   user.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
	 }
	 return user;
});

Meteor.startup(function() {
    // Add Facebook configuration entry
    ServiceConfiguration.configurations.update(
      { "service": "facebook" },
      {
        $set: {
          "appId": "XXXXXXXXXXXXXXX",
          "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        }
      },
      { upsert: true }
    );
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
