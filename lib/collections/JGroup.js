JGroup = new Mongo.Collection('jgroup');
JGroup.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
  remove: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
 });



Meteor.methods({

	groupRequest:function(idGroupe,IdAdmin,IdMoi,Statut){

		JGroup.insert({

			IDGroupe : idGroupe,
			Administrateur : IdAdmin,
			Demandeur : IdMoi,
			Accepter : Statut,
		});

	},
	Accepter:function(ID,IdDemandeur,IdAdministrateur){

		JGroup.update({_id : ID},
			{$set:{Accepter : '1'}});
	}
});