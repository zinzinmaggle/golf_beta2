likePostsGroup = new Mongo.Collection('likepostsgroup');

likePostsGroup.allow({
 
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

	insertLikeGroup : function(userId,postId){

			likePostsGroup.insert({

				userID : userId,
				postID : postId,

			});
	}

});