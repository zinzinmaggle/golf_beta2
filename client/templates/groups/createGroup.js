var instance;
var mygrouptab = [];
var groupCreatedId;
var currentGroupID;
Template.createGroup.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'createGroup',
        index: 'usersgroup'
    });
    instance2 = EasySearch.getComponentInstance({
        id: 'createGroup',
        index: 'addmorefriends'
    });
    $('#editGroup-container').css('display','none');
    $('#addMember-container').css('display','none');
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
   'click .editGroup':function(event){
   	 event.preventDefault();
   	 $('#editGroup-container').css('display','block');
     $('#addMember-container').css('display','none');
     currentGroupID = this._id;
   },
   'click .changeNameGroup':function(e){
   	e.preventDefault();
   	Groups.update({_id : currentGroupID},
   	{'$set' :{nomDuGroupe : $('#idNewGroupe').val()}});

   },
   'click .addMember':function(event){
   	 event.preventDefault();
   	 $('#editGroup-container').css('display','none');
     $('#addMember-container').css('display','block');
     currentGroupID = this._id;
   },
   'click .removeGroup':function(event){
   	 event.preventDefault();
   	 Groups.remove({_id: this._id});
   	 $('#editGroup-container').css('display','none');
    $('#addMember-container').css('display','none');
   },
   'click .exitGroup':function(event){
   	 event.preventDefault();
   	 $('#editGroup-container').css('display','none');
    $('#addMember-container').css('display','none');
    Groups.update(
	  { _id: this._id },
	  { $pull: { membre: { memberID: Meteor.userId() } } }
	);	
   },
   'click #addFriendToGroup' :function(e){
   	e.preventDefault();
   	console.log(this);
   	Groups.update(
   	{
   		_id : currentGroupID},
   		{$push:{membre :{ memberID : this.ID, statut : '0'}}}
   	)
   }
});
