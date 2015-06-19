commentPostsGroup = new Mongo.Collection('commentpostsgroup');

commentPostsGroup.allow({
 
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

	insertCommentGroup : function(userId,postId,commentaire){

			commentPostsGroup.insert({

				userID : userId,
				postID : postId,
				comment: commentaire,
				date : new Date(),

			});
	}

});