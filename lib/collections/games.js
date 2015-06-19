Games = new Mongo.Collection('games');

// EasySearch.createSearchIndex('games', {
// 	field: ['name'],
// 	collection: Games,
// });

Games.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		return true;
	}
});
