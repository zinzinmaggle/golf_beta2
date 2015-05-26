Meteor.publish('posts', function(id) {
	return Posts.find({id: id});
});
Meteor.publish('region', function() {
	return Region.find();
});
Meteor.publish('golf', function() {
	return Golf.find();
});
