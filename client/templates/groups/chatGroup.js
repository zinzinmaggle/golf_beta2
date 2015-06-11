Template.chatGroup.rendered = function()
{
	Session.set('chapp-username',Meteor.user().username); //you could set the user name on user login

	//Session.set('chapp-historysince',new Date());
}

Template.chat_form.inheritsHelpersFrom("chapp_form");
Template.chat_form.inheritsEventsFrom("chapp_form");
Template.chat_form.replaces("chapp_form");

Template.chat_form.events({
	'click #send-message' : function(e) {
		$('#chapp-form').submit();
	}
});
