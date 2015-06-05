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

		// return Groups.find({$or:[{},{}]}).fetch();
	},
	FriendsGroupList:function(){

		// var tab_temp = Groups.find({users:{"statut":"1"},_id: this._id}).fetch(),
		// user, 
		// groupList = [];
		// console.log(this);
		// for (var i = tab_temp.length - 1; i >= 0; i--) {
			
		// 	user = Meteor.users.find({_id: tab_temp[i].users[0].user_id}).fetch();
			
		// 	groupList.push(user[0]);
		// };

		
		// 	return groupList;
		
		
		
	},
	Statut:function(){

		// var st = Groups.find({"users.user_id": Meteor.userId()}).fetch();
		// for (var i = st.length - 1; i >= 0; i--) {
		// 	var statut;
		// 	console.log(st[i].users[0].statut);
		// 	if(st[i].users[i+1].statut == "1" && st[i].users[i+1].user_id == Meteor.userId())
		// 	{
		// 		statut = "membre";
		// 	}
		// 	else if(st[i].users[i+1].statut == "2" && st[i].users[i+1].user_id == Meteor.userId())
		// 	{
		// 		statut = "admin";
		// 	}
		// 	else
		// 	{
		// 		statut = "non accepté";
		// 	}
		// };

		// return statut;
	},
	QueryGroupList:function(){

		// return Groups.find({users:{"user_id": Meteor.userId(), "statut": "0"}}).fetch();
	}	
});
Template.createGroup.events({

  'click .createGroup': function (event) {
    event.preventDefault();
    var $button = $(event.target);
    var user;
    
    user = Meteor.users.find({username: $button.attr('user-name')}).fetch();
   	
    mygrouptab.push(user[0]._id);
    
    console.log("mon tab :"+ mygrouptab)
	$button.attr('disabled','disabled');   
   
    return mygrouptab;
  },
  'submit form':function(e){
  	e.preventDefault();
  	mygrouptab.push(Meteor.userId());
  	if( $(e.target).find('[name=ngroupe]').val() == "")
  	{
  		alert("Veuillez renseigner un nom de groupe");
  	}
  	else
  	{

  		
	  	Groups.insert(
	  	{
	  		name: $(e.target).find('[name=ngroupe]').val(),
		    users: mygrouptab.length,
		   
	  	});
	  	var temps = Groups.find({name : $(e.target).find('[name=ngroupe]').val()}).fetch();
	  	Meteor.call("createCollectionGroup",temps[0]._id,$(e.target).find('[name=ngroupe]').val(),mygrouptab);
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
     Meteor.call("setTo1",this._id);
     
    

   }
});