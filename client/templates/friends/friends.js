Template.showFriendsQuery.helpers({
  friends: function() {
    return Friends.find({ accepted: false, id1 : Meteor.userId() }).fetch();
  }
  
});
Template.showFriendsList.helpers({
  friends: function() {
    return Friends.find({ accepted: true, id1 : Meteor.userId() }).fetch();
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
  }
});
