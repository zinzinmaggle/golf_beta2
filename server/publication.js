Meteor.publish('stuff', function() {
	return Stuff.find();
});
Meteor.publish('gallery', function() {
	return Gallery.find();
});
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
Meteor.publish('course', function() {
	return Course.find();
});
