Template.showFriendsQuery.helpers({
	friendsQuery: function() {
		return Friends.find({ accepted: false, id2 : Meteor.userId() }).fetch();
	}
});

Template.showFriendsList.helpers({
	friendsList: function() {
		var frd = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId() }, { accepted: true, id1 : Meteor.userId() }]}).fetch(),
			friends =[],
			user;

		for (var i = frd.length - 1; i >= 0; i--) {
			var id;
			if (frd[i].id1 == Meteor.userId()) {
				id = frd[i].id2;
			} else {
				id = frd[i].id1;
			}
			user = Meteor.users.find({_id: id}).fetch();
			
			friends.push(user[0]);
		};

		return friends;
	}
});

Template.showFriends.events({
	'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
		// $('core-pages#tabContent').attr('selected', function() {
		// 	return $(e.target).attr('page')
		// });
	},
});

Template.showFriendsQuery.events({
  'click #confirmFriend': function (event) {
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

Template.showFriends.helpers({
	friendQueryCounter: function() {
		var Counter = Friends.find({ accepted: false, id2 : Meteor.userId() }).count();
		if(Counter === 0)
		{
			return '';
		}
		else
		{
			return "("+Counter+")";
		}
	},
	friendListCounter: function() {
		var frd = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId() }, { accepted: true, id1 : Meteor.userId() }]}).fetch(),
			friends = [],
			user;

		for (var i = frd.length - 1; i >= 0; i--) {
			var id;
			if (frd[i].id1 == Meteor.userId()) {
				id = frd[i].id2;
			} else {
				id = frd[i].id1;
			}
			user = Meteor.users.find({_id: id}).fetch();
			
			friends.push(user[0]);
		};

		return "("+friends.length+")";
	},
	currentTab: function() {
		return Session.get('currentTab');
	}
});