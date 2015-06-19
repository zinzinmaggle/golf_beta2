Golf = new Mongo.Collection('golf');

EasySearch.createSearchIndex('golfs', {
	field: ['name', 'city'],
	collection: Golf,
	limit: 20
});

EasySearch.createSearcher('golfsNearsSearcher', {
	'createSearchIndex': function(name, options) {
		// osef
	},
	'search': function(name, searchString, options, callback) {
		var pos = searchString.split(';');

		var golfs = Golf.find({
			pos: {
				$near: [parseFloat(pos[0]), parseFloat(pos[1])],
			}
		}, {limit: 1}).fetch();

		return {
			total: golfs.length,
			results: golfs
		};
	}
});

EasySearch.createSearchIndex('golfsNears', {
	field: ['name', 'city'],
	collection: Golf,
	limit: 20,
	use: 'golfsNearsSearcher',
});
EasySearch.createSearchIndex('Eventgolfs', {
	field: ['name', 'city'],
	collection: Golf,
	limit: 20
});
