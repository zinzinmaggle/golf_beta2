Template.showFriendsQuery.helpers({
  friendsQuery: function() {
    return Friends.find({ accepted: false, id2 : Meteor.userId() }).fetch();
  }
  
});
Template.showFriendsList.helpers({
  friendsList: function() {
    return Friends.find({ accepted: true, id2 : Meteor.userId() }).fetch();
 }
});
Template.showFriends.events({
  'click .btn': function (event) {
    event.preventDefault();

    var $button = $(event.target);

   	Friends.update({
			_id: $button.attr('user-id')
		}, {
			$set: { 
				accepted: true
			}
		});
 	
 	Meteor.users.insert({
 	friends: {
                friend : Friends.find({ accepted: true, id2 : Meteor.userId() }).username
                
    },

});
  }
});
