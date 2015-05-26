Template.postsList.helpers({
  posts: function() {
   		var friend_subscribe = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId() }, { accepted: true, id1 : Meteor.userId() }]}).fetch(),
   		test=[],
   		user;
		for (var i = friend_subscribe.length - 1; i >= 0; i--) {
			var id;
			if (friend_subscribe[i].id1 == Meteor.userId()) {

				id = friend_subscribe[i].id2;
				
			} else {
				id = friend_subscribe[i].id1;

			}

			user = Meteor.users.find({_id: id}).fetch();
			
			test.push(user[0]);
			
		};
		
		
		return Posts.find();
		
		
  }
});