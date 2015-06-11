
Template.postsList.helpers({
 posts: function() {
 		//Meteor.subscribe('posts', Meteor.userId());
  		var frd_subscribe = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId()}, { accepted: true, id1 : Meteor.userId()}]}).fetch();
   		var tab_id = [];
   		var user;
   		tab_id.push(Meteor.userId());
   		if( frd_subscribe.length == 0)
	    {
	    	return Posts.find({id: Meteor.userId()},{sort: {submit_date: -1}});
	    }
	    else
	    {	
	    	
	    	for (var i = frd_subscribe.length - 1; i >= 0; i--) {
	    	var id; 	
	    	if (frd_subscribe[i].id1 == Meteor.userId()) {
				id = frd_subscribe[i].id2;
			} 
			else {
				id = frd_subscribe[i].id1;
			}

			user = Meteor.users.find({_id: id}).fetch();
			
			tab_id.push(user[0]._id);

	    	};
	    	
	    	
			return Posts.find({id: {$in: tab_id}},{sort: {submit_date: -1}});
	    }

   		
  }
});