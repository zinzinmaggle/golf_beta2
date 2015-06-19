Groups = new Mongo.Collection('groups');

Groups.allow({
 
 insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
 update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return true;
  },
  remove: function(userId, doc)
  {
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
        content:'',
        author : Meteor.user().username,
        submit_date: new Date(),
        type:'statut',
        encrypted_mail : Meteor.user().encryptedMail,
        id : Meteor.userId(),


     })

  },
  Insert:function(IDGROUPE,IDDEMANDEUR,IDADMINISTRATEUR){

    Groups.update({_id : IDGROUPE, admin : IDADMINISTRATEUR},
      {$push:{membre:{memberID : IDDEMANDEUR, statut :'1'}}});
    var utilisateur = Meteor.users.find({_id : IDDEMANDEUR}).fetch();
    var groupInfo = Groups.find({_id : IDGROUPE}).fetch();
    Posts.insert({

        title: utilisateur[0].username ,
        subtitle:'− à rejoint un groupe',
        content:'Groupe ' + groupInfo[0].nomDuGroupe,
        author : utilisateur[0].username,
        submit_date: new Date(),
        type:'statut',
        encrypted_mail : utilisateur[0].encryptedMail ,
        id : Meteor.userId(),


     })
  }
  
});
EasySearch.createSearchIndex('usersgroup', {
  field: 'friendsList.$.friendIs',
  collection: Meteor.users,
  'query' : function (searchString) {
        // Default query that will be used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
        console.log(Meteor.user());
        query.friendsList = {
          $elemMatch: {
            friendIs: query.$or[0]['friendsList.$.friendIs']
          }
        };
        query._id = Meteor.user()._id;
        delete query.$or;
      
        return query;
    }
  

});
EasySearch.createSearchIndex('addmorefriends', {
  field: 'friendsList.$.friendIs',
  collection: Meteor.users,
  'query' : function (searchString) {
        // Default query that will be used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
        console.log(Meteor.user());
        query.friendsList = {
          $elemMatch: {
            friendIs: query.$or[0]['friendsList.$.friendIs']
          }
        };
        query._id = Meteor.user()._id;
        delete query.$or;
     
        return query;
    }
  

});
EasySearch.createSearchIndex('groups', {
  field: ['nomDuGroupe'],
  collection: Groups,
});