Meteor.users.initEasySearch('username');
Meteor.users.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  },
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return true;
  }
 });

