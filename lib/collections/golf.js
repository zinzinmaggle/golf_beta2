Golf = new Mongo.Collection('golf');

EasySearch.createSearchIndex('golfs', {
	field: ['name', 'city'],
	collection: Golf,
	limit: 20
});
