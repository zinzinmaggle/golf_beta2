Gallery = new Mongo.Collection('gallery');
Gallery.allow({
 
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

	InsertDefinitive: function (ArrayOfImage,NomAlbum, SetTo1,idUser) {

		Gallery.insert({

			idUser : idUser,
			Pictures : ArrayOfImage,
			NomAlbum : NomAlbum,
			draft : SetTo1,

		});
	},

	
});