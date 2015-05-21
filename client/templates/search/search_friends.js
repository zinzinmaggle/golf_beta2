
/*  field: 'username',
  collection: Meteor.users,
  use: 'mongo-db',
  query: function (searchString, opts) {
    // Default query that is used for searching
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    // Make the emails searchable
 

    return query;
  }
});*/
EasySearch.createSearchIndex('users', {
  field: ['username'],
  collection: Meteor.users,
});


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
