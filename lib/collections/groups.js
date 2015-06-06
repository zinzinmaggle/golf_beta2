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
  setTo1: function (myiD,nomduGroupe) {

  	 Groups.update( {_id : myiD , "membre.memberID" : Meteor.userId() } , 
                {"$set" : {"membre.$.statut" : "1"}});

     Posts.insert({

        title: Meteor.user().username,
        subtitle:'− à rejoint un groupe',
        content:'Groupe ' + nomduGroupe,
        author : Meteor.user().username,
        submit_date: new Date(),
        type:'statut',
        encrypted_mail : Meteor.user().encryptedMail,
        id : Meteor.userId(),


     })

  }
  
});