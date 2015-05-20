Meteor.publish('friends', function() {
  if(!this.userId) return null;
	return Friends.find();
});