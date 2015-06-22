var golf = new ReactiveDict();
golf.set('courses', []);
golf.set('players', [null, null, null, null]);

Template.gameCreate1.onCreated(function() {
	// set up reactive computation
	this.autorun(function() {
		var instance = EasySearch.getComponentInstance({
			index: 'golfs',
			id: 'golfSelect'
		});

		instance.on('autosuggestSelected', function(values) {
			// run every time the autosuggest selection changes
			if (values != undefined && values.length > 0)
			{
				console.log(values[0].id);
				var courses = Course.find({golf: values[0].id}).fetch();
				console.log(courses);
				golf.set('courses', courses);
			}
		});
	});
});

Template.gameCreate1.helpers({
	'suggestion': function() {
		console.log(Template.suggestionTpl);
		return Template.suggestionTpl;
	},
	'courses': function() {
		return golf.get('courses');
	},
	image: function() {
		if (this.photos != undefined && this.photos.length > 0)
			return '/photos/' + this.photos[0];
		return 'http://lorempixel.com/90/90/nature/g' + this.zipCode;
	},
	nbParcours: function() {
		var nombre = Course.find({golf: this._id}).fetch().length;
		return nombre + ' parcours';
	},
});

Template.gameCreate1.events({
	'core-select paper-dropdown-menu': function(e) {
		e.preventDefault();
		console.log($(e.target.selectedItem).attr('value'));
	},
});

Template.gameCreate2.helpers({
	'courses': function() {
		return Course.find({golf: this._id}).fetch();
	},
});

Template.gameCreate3.helpers({
	players : function() {
		console.log(this);
		return golf.get('players');
	},
	caca: function()
	{
		console.log(this);
	}
});

Template.gameCreate3.onRendered(function() {
	var players = golf.get('players');
	players[0] = Meteor.user();
	players[0].username = 'Moi';
	golf.set('players', players);
	// set up reactive computation
	this.autorun(function() {
	});
});

Template.gameCreate4.events({
	'click #finish': function(e) {
		e.preventDefault();
		console.log($('#formule')[0].selectedItem);
		if($('#formule')[0].selectedItem.label == '')
		{
			//alert("Veuillez remplir tout les champs !");
		}
		else
		{
			Games.insert({ 
				created: new Date(),
				golf: this.golf._id,
				course: this.course._id,
				players : [Meteor.user()._id, null, null, null],
				formule : $('#formule')[0].selectedItem.label,
				depart : $('#depart')[0].selectedItem.label,
				score: [],
				finisehd: false,
			});
			Router.go('gamesList');
		}
	},
});
