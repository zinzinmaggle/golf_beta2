Meteor.publish('groups', function() {
	return Groups.find();
});
Meteor.publish('posts', function() {
	return Posts.find();
});
Meteor.publish('region', function() {
	return Region.find();
});
Meteor.publish('golf', function() {
	return Golf.find();
});
