Meteor.publish('posts', function(author) {
	return Posts.find({id: author});
});
Meteor.publish('region', function() {
	return Region.find();
});
Meteor.publish('golf', function() {
	return Golf.find();
});
