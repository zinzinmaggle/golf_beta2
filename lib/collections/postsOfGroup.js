postsGroup = new Mongo.Collection('postsgroup');
postsGroup.allow({
 
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
    giveId: function(groupId,username,mailencrypted,StringName) {
      
      postsGroup.insert({

	  		title : username,
	  		subtitle : '− à crée un groupe',
	  		content : 'Groupe nommé '+StringName,
	  		author : username,
	  		submit_date: new Date(),
	  		type : 'statut',
	  		encrypted_mail : mailencrypted,
	  		id : groupId,

	  	});
        
    }
});
