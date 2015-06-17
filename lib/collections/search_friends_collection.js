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
            when: new Date(),
        });
        
        var friendRequestInsert = Friends.insert(friendAdd);
        
    },
    removeFriend:function(myId,FriendId)
    {
        Friends.remove(

            {$or: [{ id1: myId, id2 : FriendId }, { id2: myId, id1 : FriendId }]}

        );
        Meteor.users.update(
        {
            _id : myId},
            { $pull: { friendsList: { ID: FriendId } } }
        );
         Meteor.users.update(
        {
            _id : FriendId},
            { $pull: { friendsList: { ID: myId } } }
        );
    }
});
Friends.allow({
 
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
  remove: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
 });



EasySearch.createSearchIndex('users', {
  field: ['username'],
  collection: Meteor.users,
});