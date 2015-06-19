Template.gamesList.events({
	'click paper-tab': function (e) {
		Session.set('currentTabGames', $(e.target).attr('page'));
		
	},
});

Template.gamesList.helpers({
	currentTabGames: function() {
		return Session.get('currentTabGames');
	},
	games: function()
	{
		return Games.find({
			"players" : Meteor.user()._id,
		}).fetch();
	},
	golfName: function()
	{
		return Golf.findOne(this.golf).name;
	}
});
