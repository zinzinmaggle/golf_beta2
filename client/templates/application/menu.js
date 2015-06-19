
Template.menu.helpers({

chatList :function(){

	return Groups.find({$or:[{membre:{"memberID": Meteor.userId(), "statut": "1"}},{admin : Meteor.userId()}]}).fetch();
},
queryFriendCounter:function()
{
	var Counter = Friends.find({ accepted: false, id2 : Meteor.userId() }).count();
	if(Counter === 0)
	{
		return "";
	}
	else
	{
		return "("+Counter+")";
	}
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
}

});