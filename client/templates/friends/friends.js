Template.showFriendsQuery.helpers({
	friendsQuery: function() {
		var friendQuery =  Friends.find({ accepted: false, id2 : Meteor.userId() }).fetch(),
		user,
		tabQuery = [];
		for(var i = friendQuery.length - 1; i >= 0; i--){

			user = Meteor.users.find({_id: friendQuery[i].id1}).fetch();
			tabQuery.push({user : user[0], idRelation : friendQuery[i]._id, id1 : friendQuery[i].id1, id2 : friendQuery[i].id2 });
		};
		console.log(tabQuery);
		return tabQuery;
	},
	myUsername : function(){

		return Meteor.user().username;
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

Template.showFriends.rendered = function() {
	Session.set('currentTab', 'tab1');
};

Template.showFriendsQuery.events({

  'click .confirmFriend': function (event) {
    event.preventDefault();
    var $button = $(event.target);
    var currentUsername = Meteor.user().username;
   	Friends.update({
		_id: $button.attr('user-id')
	}, {
		$set: { 
			accepted: true
		}
	});
   
   	if($button.attr('id2') == Meteor.userId())
   	{
   		Meteor.users.update({ _id: $button.attr('id1') },{ $push: { friendsList: {friendIs : $button.attr('usernameSelf'),ID : Meteor.userId() }}});
   		Meteor.users.update({ _id: $button.attr('id2') },{ $push: { friendsList: {friendIs :  $button.attr('username'), ID : $button.attr('id1') }}});
   	}
   	else
   	{
   		Meteor.users.update({ _id: $button.attr('id1') },{ $push: { friendsList: {friendIs : $button.attr('username'), ID : $button.attr('id2') }}});
   		Meteor.users.update({ _id: $button.attr('id2') },{ $push: { friendsList: {friendIs :  $button.attr('usernameSelf'),ID : Meteor.userId() } }});
   	}	
   
   	
   	
  
   
 
   	},
   	'click .refuseFriend':function(e){
   		var $button = $(event.target);
   		Friends.remove({

   			_id : this.idRelation
   		});

   	}
});
Template.showFriendsList.events({
'click .removeFriend':function(e){
	e.preventDefault();
	Meteor.call('removeFriend',Meteor.userId(),this._id);
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