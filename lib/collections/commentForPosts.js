commentPosts = new Mongo.Collection('commentposts');

commentPosts.allow({
 
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

	insertComment : function(userId,postId,commentaire){

			commentPosts.insert({

				userID : userId,
				postID : postId,
				comment: commentaire,
				date : new Date(),

			});
	}

});