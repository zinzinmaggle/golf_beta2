Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
 
  
});

Template.postsList.rendered = function() {
   var frd = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId() }, { accepted: true, id1 : Meteor.userId() }]}).fetch(),
			subscribe_friend =[],
			user;

		for (var i = frd.length - 1; i >= 0; i--) {
			var id;
			if (frd[i].id1 == Meteor.userId()) {
				Meteor.subscribe('posts',frd[i].id1);
			} else {
				Meteor.subscribe('posts',frd[i].id2);
			}



		//return friends;
	};
    
};