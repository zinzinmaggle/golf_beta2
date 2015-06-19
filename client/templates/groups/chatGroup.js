var avatar;
Template.chatGroup.rendered = function()
{
	Session.set('chapp-username',Meteor.user().username); //you could set the user name on user login
	avatar = Meteor.user().encryptedMail;
	//Session.set('chapp-historysince',new Date());
}



Template.chat_form.events({
	'click #fake' : function(e) {
		console.log(e.target);
		e.preventDefault();
		$('#chapp-form').submit();
	}
});

Template.chat_item.helpers({

	users:function(){
		
		console.log(this);
		return avatar;
		
	}
	
});
Template.chat_form.inheritsHelpersFrom("chapp_form");
Template.chat_form.inheritsEventsFrom("chapp_form");
Template.chat_item.inheritsHelpersFrom("chapp_item");
Template.chat_item.inheritsEventsFrom("chapp_item");
Template.chat_form.replaces("chapp_form");
Template.chat_item.replaces("chapp_item");
