var instance;
var mygrouptab = [];
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

		return Groups.find({$or:[{users:{"user_id": Meteor.userId(), "statut": "2"}},{users:{"user_id": Meteor.userId(),statut:"1"}}]}).fetch();
	},
	FriendsGroupList:function(){

		var tab_temp = Groups.find({$or:[{users:{"user_id": Meteor.userId(), "statut": "2"}},{users:{"user_id": Meteor.userId(),statut:"1"}}]}).fetch(),
		user, 
		groupList = [];
		for (var i = tab_temp.length - 1; i >= 0; i--) {
			
			user = Meteor.users.find({_id: tab_temp[i].users[0].user_id}).fetch();
			
			groupList.push(user[0]);
		};

		console.log(groupList);
		return groupList;
	}	
});
Template.createGroup.events({

  'click .createGroup': function (event) {
    event.preventDefault();
    var $button = $(event.target);
    var user;
    
    user = Meteor.users.find({username: $button.attr('user-name')}).fetch();
   
    mygrouptab.push({user_id: user[0]._id, statut: '0'});
    mygrouptab.push({user_id: Meteor.userId(), statut: '2'});
	   
   
    return mygrouptab;
  },
  'submit form':function(e){
  	e.preventDefault();
  	if( $(e.target).find('[name=ngroupe]').val() == "")
  	{
  		alert("Veuillez renseigner un nom de groupe");
  	}
  	else
  	{


	  	Groups.insert(
	  	{
	  		name: $(e.target).find('[name=ngroupe]').val(),
		    users: mygrouptab
		   

	  	});

  	}

  },
  'click paper-tab': function (e) {
		console.log($(e.target).attr('page'));
		Session.set('currentTab', $(e.target).attr('page'));
	},
});