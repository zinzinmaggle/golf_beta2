Meteor.users.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  },
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
 });