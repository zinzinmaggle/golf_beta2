Groups = new Mongo.Collection('groups');
EasySearch.createSearchIndex('usersgroup', {
  field: ['friendsList'],
  collection: Meteor.users,
});
Groups.allow({
 
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
  setTo1: function (myiD) {

  	 Groups.update({
     	_id: myiD,
     	"users.user_id" : Meteor.userId(),
	}, {
		$set: { 
			"users.0.statut" : "1", 
		}
	});

  },
  createCollectionGroup:function(idGroup,NomGroup,Tab){
  	console.log(idGroup);
  	console.log(NomGroup);
  	console.log(Tab);
	mystring = 'myVar';
	window[mystring] = idGroup;
/*********************C ICI QUE CA BUG**********/
  	myVar = new Mongo.Collection('mystring');
 /**************SALOPERIE DE LIGNE************/ 	

  }
  
});