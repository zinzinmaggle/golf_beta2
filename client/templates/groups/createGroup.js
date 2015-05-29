EasySearch.createSearchIndex('usersgroup', {
  field: ['friendsList[]'],
  collection: Meteor.users,
});
Template.createGroup.helpers({
	
});