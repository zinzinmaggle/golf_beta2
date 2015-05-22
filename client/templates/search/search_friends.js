

Template.searchFriends.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'friendSearch',
        index: 'users'
    });
};


var instance;
Template.searchFriends.helpers({
	users: function() {
		return Meteor.users.find();
	},
  results: function(){
    if (instance !== undefined)
      return instance.get('total');
    return false;
  },
  pluralize: function() {
    if (instance !== undefined && instance.get('total') > 1)
      return 's';
    return '';
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
           else
            {
              /*if()
              {*/
                 $button.text('En attente');
                 $button.attr('disabled', 'disabled');
              /*}
              else if()
              {

              }
              else
              {

              }*/
            }
        });
  }
});
