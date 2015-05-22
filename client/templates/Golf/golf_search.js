var instance;

Template.golfSearch.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'golfSearch',
        index: 'golfs'
    });
};

Template.golfSearch.helpers({
	golfs: function() {
		return Golf.find();
	},
	results: function(){
		if (instance !== undefined)
			return instance.get('total');
		return false;
	},
	pluralize: function() {
		if (instance !== undefined && instance.get('total') > 1)
			return 's';
		return '';
	}
});
