Accounts.onCreateUser(function(options, user){

	user.surname = 'please enter a surname'
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
return Meteor.users.find(this.userId,{fields: {

surname :1,

}});


});