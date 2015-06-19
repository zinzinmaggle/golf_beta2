var instance;
var plurielMembre;
Template.joinGroup.rendered = function() {
    	instance = EasySearch.getComponentInstance({
        id: 'groupSearch',
        index: 'groups'
    });
    
};
Template.joinGroup.helpers({
	users: function() {
		return Meteor.users.find();
	},
	groups:function(){
		return Groups.find();
	},
  results: function(){
    if ((instance !== undefined) && (this._id !== Meteor.userId()))
      return instance.get('total');
    return false;
  },
  pluralize: function() {
    if (instance !== undefined && instance.get('total') > 1)
      return 's';
    return '';

  },
  ifNotFriend: function(){
    
    //var frd = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId(), id1: this._id }, { accepted: true, id1 : Meteor.userId(), id2: this._id },{ accepted: false, id2 : Meteor.userId(), id1: this._id }, { accepted: false, id1 : Meteor.userId(), id2: this._id }]}).fetch();
   
    //var isMember = Groups.find()
    // if( frd.length == 0)
    // {
    //    return "";
    // }
    // else
    // {

    //   return "disabled";
    // }
       
  },
  ifSelf:function(){
  	var isMember = Groups.find({_id : this._id}).fetch();
  	for(var i = isMember.length -1;i>=0;i--)
  	{	
  		if(isMember[i].admin == Meteor.userId())
  		{
  			return "disabled";
		
  		}
  		else
  		{
  		for(var j = isMember[i].membre.length-1;j>=0;j--)
  		{

  			if(isMember[i].membre[j].memberID == Meteor.userId())
  			{
  				return "disabled";
  			}
  			else
  			{
  				return "";
  			}
  		
  		};
  		}
  	};
  	// if(isMember.length > 0)
  	// {
  	// 	return "disabled";
  	// }
  	// else
  	// {
  	// 	return '';
  	// }
  
  	
  
  },
  alreadyAsked:function()
  {
  	var alreadyAsked = JGroup.find({IDGroupe : this._id, Demandeur : Meteor.userId()}).fetch();
  	if(alreadyAsked.length > 0)
  	{
  		return "disabled";
  	}
  	else
  	{
  		return "";
  	}
  },
  adminUsername : function()
  {
  	var user = Meteor.users.find({_id : this.admin}).fetch();
  	
  	return user[0].username;
  },
  nombreMembre : function()
  {
  	var membre = Groups.find({_id : this._id}).fetch();
  	plurielMembre = membre[0].membre.length;
  	return membre[0].membre.length;
  },
  pluriel : function(){
  	 if (plurielMembre > 1)
      return 's';
    return '';

  }


});
Template.joinGroup.events({
  'click .addFriend': function (event) {
    event.preventDefault();
   
    Meteor.call('groupRequest', this._id,this.admin,Meteor.userId(),'0', function(error, result) {
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return alert(error.reason);
         
            
        });
  }
});
