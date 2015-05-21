Friends = new Mongo.Collection('friends');
Meteor.methods({
    friendRequest: function(friendAttributes) {
        check(Meteor.userId(), String);
        check(friendAttributes, {
            id1: String,
            id2: String,
            accepted : Boolean
        });
        var user = Meteor.user();
        var friendAdd = _.extend(friendAttributes, {
            statut: "En attente",
            username: user.username,
            when: new Date(),
            encryptedmail:user.encryptedMail,
            level: user.level
        });
        
        var friendRequestInsert = Friends.insert(friendAdd);
        
    }
});
Friends.allow({
 
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  }
 });



EasySearch.createSearchIndex('users', {
  field: ['username'],
  collection: Meteor.users,
});