var instance;
var mygrouptab = [];
var groupCreatedId;
Template.createGroup.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'createGroup',
        index: 'usersgroup'
    });
};

Template.createGroup.helpers({
  users: function() {
	return Meteor.users.find(Meteor.userId());
	},
	currentTab: function() {
		return Session.get('currentTab');
	},
	GroupList:function(){

		return Groups.find({$or:[{membre:{"memberID": Meteor.userId(), "statut": "1"}},{admin : Meteor.userId()}]}).fetch();
	},
	FriendsGroupList:function(){

		var tab_temp = Groups.find({_id: this._id}).fetch(),
		user;
		for (var i = tab_temp.length - 1; i >= 0; i--) {
			
			var ArrayOfId = [];
			for(var j = tab_temp[i].membre.length -1; j>=0;j--)
			{
				
				user = Meteor.users.find({_id : tab_temp[i].membre[j].memberID}).fetch();
				ArrayOfId.push(user[0]);
			}
		

		};

				
			return ArrayOfId;
		
		
		
	},
	
	QueryGroupList:function(){

		return Groups.find({membre:{"memberID": Meteor.userId(), "statut": "0"}}).fetch();
	},

	Admin:function(){

		var Admin = Groups.find({membre:{"memberID": Meteor.userId(), "statut": "0"}}).fetch();
		var user;
		user = Meteor.users.find({_id : Admin[0].admin}).fetch();
		if(user.length > 0)
		{
			return user[0].username;
		}
		else
		{
			return "";
		}
	}	
});
Template.createGroup.events({

  'click .createGroup': function (event) {
    event.preventDefault();
    var $button = $(event.target);
    var user;
    
    user = Meteor.users.find({_id: $button.attr('user-id')}).fetch();
   	
    mygrouptab.push({memberID : user[0]._id,statut : '0'});
    
	$button.attr('disabled','disabled');   
   
    return mygrouptab;
  },
  'click #createGroupButton':function(e){
  	e.preventDefault();
 
  	if( $('[name=namegroupe]').val() == "")
  	{
  		alert("Veuillez renseigner un nom de groupe");
  	}
  	else
  	{

  		
  		myquery = {nomDuGroupe: $('[name=namegroupe]').val(),admin : Meteor.userId(), membre : mygrouptab,nombreDeMembre: mygrouptab.length};
	  	Groups.insert(myquery, function(err,docsInserted)
	  	{
	  		
	  		Meteor.call("giveId", docsInserted,Meteor.user().username,Meteor.user().encryptedMail,$('[name=namegroupe]').val());
	  		// nomDuGroupe: $('[name=namegroupe]').val(),
	  		// admin : Meteor.userId(),
	  		// membre : mygrouptab,
		   //  nombreDeMembre: mygrouptab.length,
		   
	  	});
	  	
	  	
	  	
  	}

  },
  'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
	},
   'click .joinGroup': function(event){
   	 event.preventDefault();
     var $button = $(event.target);
   	 $button.attr('disabled','disabled');
   	 Meteor.call("setTo1",this._id,this.nomDuGroupe);
     
    

   }
});