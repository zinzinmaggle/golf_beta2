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

	Insert: function (ArrayOfImage, idUser, SetTo0) {

		Gallery.insert({

			idUser : idUser,
			Pictures : ArrayOfImage,
			draft : SetTo0,

		});
	},

	InsertDefinitive :function(NomAlbum,SetTo1,idUser){

		var isDraft = Gallery.find({idUser: Meteor.userId()}).fetch();

		if(isDraft[0].draft == '0')
		{

		Gallery.update({

		idUser: idUser,
     	
	}, {
		$set: { 
			draft : SetTo1,
			NomAlbum : NomAlbum,
		}

		});
		}

	}

});