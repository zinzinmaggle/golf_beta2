Template.chat_form.inheritsHelpersFrom("chapp_form");
Template.chat_form.inheritsEventsFrom("chapp_form");
Template.chat_form.inheritsHooksFrom("chapp_form");
Template.chat_item.inheritsHelpersFrom("chapp_item");
Template.chat_item.inheritsEventsFrom("chapp_item");
Template.chat_item.inheritsHooksFrom("chapp_item");

Template.chatGroup.rendered = function()
{
	Session.set('chapp-username', Meteor.user().username);
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
		return Meteor.users.findOne({username: this.chatUserName}).encryptedMail;
	},
    formatDate: function(date) {
        return moment(date).fromNow();
    },
    formatISODate: function(date) {
        return moment(date).toISOString();
    },
    formatFullDate: function(date) {
        return moment(date).format('DD MMMM YYYY HH[:]mm Z');
    },
    color: function() {
		return Meteor.users.findOne({username: this.chatUserName}).color;
    }
});
