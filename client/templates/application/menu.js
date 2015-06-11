Template.menu.helpers({

chatList :function(){

	return Groups.find({$or:[{membre:{"memberID": Meteor.userId(), "statut": "1"}},{admin : Meteor.userId()}]}).fetch();
}

});