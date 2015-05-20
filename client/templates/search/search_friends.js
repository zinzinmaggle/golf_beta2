
if(Meteor.users.initEasySearch('username'));

Template.searchFriends.helpers({
	users: function() {
		return Meteor.users.find();
	}


});
 

Template.searchFriends.events({
  'click .btn': function (event) {
    event.preventDefault();

    var $button = $(event.target);

    console.log($button.attr('user-id'));
    var friend = {
      id1: Meteor.userId(),
      id2: $button.attr('user-id'),
      accepted : false
    };
    Meteor.call('friendRequest', friend, function(error, result) {
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return alert(error.reason);
            $button.text('En attente');
            $button.attr('disabled', 'disabled');
            
        });
  }
});
