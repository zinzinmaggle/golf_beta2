Groups = new Mongo.Collection('groups');
EasySearch.createSearchIndex('usersgroup', {
  field: ['friendsList'],
  collection: Meteor.users,
});
Groups.allow({
 
 insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  }
 });