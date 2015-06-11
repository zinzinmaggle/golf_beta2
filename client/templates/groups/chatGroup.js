Template.chatGroup.rendered = function()
{
	Session.set('chapp-username',Meteor.user().username); //you could set the user name on user login

	//Session.set('chapp-historysince',new Date());
}