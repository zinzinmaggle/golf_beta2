likePosts = new Mongo.Collection('likeposts');

likePosts.allow({
 
 insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  }
 });

Meteor.methods({

	insertLike : function(userId,postId){

			likePosts.insert({

				userID : userId,
				postID : postId,

			});
	}

});