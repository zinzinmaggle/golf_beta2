var instance;
Template.searchFriends.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'friendSearch',
        index: 'users'
    });
    
};
Template.searchFriends.helpers({
	users: function() {
		return Meteor.users.find();
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
    
    var frd = Friends.find({$or: [{ accepted: true, id2 : Meteor.userId(), id1: this._id }, { accepted: true, id1 : Meteor.userId(), id2: this._id },{ accepted: false, id2 : Meteor.userId(), id1: this._id }, { accepted: false, id1 : Meteor.userId(), id2: this._id }]}).fetch();
   
    
    if( frd.length == 0)
    {
       return "";
    }
    else
    {

      return "disabled";
    }
       
  },
  ifSelf:function(){

    if(this._id == Meteor.userId())
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  


});
Template.searchFriends.events({
  'click .addFriend': function (event) {
    event.preventDefault();
    var $button = $(event.target);
   

    console.log($button.attr('user-id'));
    var friend = {
      id1: Meteor.userId(),
      id2: $button.attr('user-id'),
      accepted : false
    };
    Meteor.call('friendRequest', friend, function(error, result) {
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return alert(error.reason);
         
            
        });
  }
});

