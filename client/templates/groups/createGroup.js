var instance;
var mygrouptab = [];
var groupCreatedId;
var currentGroupID;
var memberCounterL;
Template.createGroup.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'createGroup',
        index: 'usersgroup'
    });
    instance2 = EasySearch.getComponentInstance({
        id: 'createGroup',
        index: 'addmorefriends'
    });
   
    $('#createGroupButton').attr('disabled','disabled');
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
			for(var j = tab_temp[i].membre.length-1; j>=0;j--)
			{
				if(tab_temp[i].membre[j].statut == "1")
				{
						user = Meteor.users.find({_id : tab_temp[i].membre[j].memberID}).fetch();
						ArrayOfId.push(user[0]);
				}
			
			}
		

		};

				
			return ArrayOfId;
		
		
		
	},
	
	QueryGroupList:function(){

		return Groups.find({membre:{"memberID": Meteor.userId(), "statut": "0"}}).fetch();
	},
	QueryGroupListAsk:function(){

		return JGroup.find({Administrateur : Meteor.userId(), Accepter : "0"}).fetch();
	},
	firstMember :function()
	{
		var Admin = Groups.find({_id : this._id}).fetch();
		var user;
		
		user = Meteor.users.find({_id : Admin[0].admin}).fetch();
		
		return user[0].username;
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
	},
	isAdmin :function(){
		var isAdmin = Groups.find({_id : this._id}).fetch();
		if(isAdmin[0].admin == Meteor.userId())
		{
			return '';
		}
		else
		{	
			return "disabled";
		}
	},
	isNotAdmin:function(){
		var isAdmin = Groups.find({_id : this._id}).fetch();
		if(isAdmin[0].admin == Meteor.userId())
		{
			return 'disabled';
		}
		else
		{	
			return "";
		}
	},

	searchMatch : function(name){

		if(name.indexOf($('#friendSearch').val()) > -1)
			return true;
		return false;
	},
	searchMatch2 : function(name){

		if(name.indexOf($('#addfriendSearch').val()) > -1)
			return true;
		return false;
	},
	queryGroupCounter:function()
	{
		var Counter = (Groups.find({membre:{memberID: Meteor.userId(), statut : '0'}}).count()) + (JGroup.find({Administrateur : Meteor.userId(), Accepter : "0"}).count());
		if(Counter === 0)
		{
			return "";
		}
		else
		{
			return "("+Counter+")";
		}
	},
	utilisateur:function(){
		
		var userAsk = JGroup.find({_id : this._id}).fetch();
		
		return Meteor.users.find({_id : userAsk[0].Demandeur});
		
	},
	nombreDeMembre:function(){

		var memberCounter = Groups.find({_id : this._id}).fetch();
		memberCounterL =  memberCounter[0].membre.length;
		return memberCounter[0].membre.length;
	},
	pluriel:function(){

		if(memberCounterL > 1)
			return "s";
		return "";

	},
	isAlreadyMember:function()
	{
		 var isActuallyMember = Groups.find({_id : currentGroupID },
         { membre: { $elemMatch: { memberID: this.ID } } }).fetch();
        console.log(isActuallyMember);
        for(i = isActuallyMember.length-1; i>=0;i--)
        {
        	 if(isActuallyMember[i].membre.length < 1)
	   	 {
	   	 	console.log("pas membre");
	    	return "";
	   	 	
	    }
	    else
	    {
	    	console.log("deja membre");
	    	return "disabled";
	    }
        };
	   	
	}
		
});
Template.createGroup.events({
   'keyup .nomGroupe':function(e){
   	e.preventDefault();
   	if($(e.target).val().length>0)
   	{
   			
   		 $('#createGroupButton').removeAttr('disabled');
   	}
   	else
   	{
   		
   		$('#createGroupButton').attr('disabled','disabled');
   	}
   },
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
     
    

   },
   'click .joinGroupAsk': function(event){
   	 event.preventDefault();
     var $button = $(event.target);
   	 $button.attr('disabled','disabled');
   	 Meteor.call("Accepter",this._id,this.Demandeur,this.Administrateur);
     Meteor.call("Insert",this.IDGroupe,this.Demandeur,this.Administrateur);
    

   },
   'click .editGroup':function(event){
   	 event.preventDefault();
   	 var $button = $(event.target);
   	 $($button.attr('random-id')).css('display','block');
     $($button.attr('r-id2')).css('display','none');
     currentGroupID = this._id;
   },
   'click .changeNameGroup':function(e){
   	e.preventDefault();
   	var $button = $(e.target);
   	Groups.update({_id : this._id},
   	{'$set' :{nomDuGroupe : $($button.attr('id-unique')).val()}});

   },
   'click .addMember':function(event){
   	 event.preventDefault();
   	 var $button = $(event.target);
   	 $($button.attr('random-id')).css('display','block');
     $($button.attr('r-id2')).css('display','none');
     currentGroupID = this._id;
   },
   'click .removeGroup':function(event){
   	 event.preventDefault();
   	 Groups.remove({_id: this._id});
   	 var $button = $(event.target);
   	 $($button.attr('random-id')).css('display','none');
     $($button.attr('r-id2')).css('display','none');
    var erase = JGroup.find({IDGroupe : this._id, Administrateur :Meteor.userId()}).fetch();
    if(erase.length > 0)
    {
   		 for(var i = erase.length-1;i>=0;i--)
    	{
    		JGroup.remove({_id : erase[i]._id});
    	};
    }
   },
   'click .exitGroup':function(event){
   	 event.preventDefault();
   	var $button = $(event.target);
   	 $($button.attr('random-id')).css('display','none');
     $($button.attr('r-id2')).css('display','none');
    Groups.update(
	  { _id: this._id },
	  { $pull: { membre: { memberID: Meteor.userId() } } }
	);	
	var erase = JGroup.find({IDGroupe : this._id, Demandeur :Meteor.userId()}).fetch();
    if(erase.length > 0)
    {
    	for(var i = erase.length-1;i>=0;i--)
    	{
    		JGroup.remove({_id : erase[i]._id});
    	};
    	
    }
   },
   'click #addFriendToGroup' :function(e){
   	e.preventDefault();
    
   
   
    			 	Groups.update(
				   	{
				   		_id : currentGroupID},
				   		{$push:{membre :{ memberID : this.ID, statut : '0'}}}
				   	)
    
   
  
   },
   'click .seeBlog' :function(e){
   	e.preventDefault();
   	
   	Router.go('postsGroup', {_id: this._id});
   }
});
