Template.gameEdit.helpers({
	golf: function() {
		return Golf.findOne(this.golf);
	},
	course: function() {
		return Course.findOne(this.course);
	},
	date: function() {
		return moment(this.created).format('DD MMMM YYYY');
	},
	player: function() {
		return Meteor.user();
	}
});

var index = 0;

Template.gameEditTable.helpers({
	trous: function() {
		return this.holes[0];
	},
	handicap: function() {
		return this.holes[2];
	},
	par: function() {
		return this.holes[1];
	},
	distance: function(color) {
		switch (color) {
			case 'noir':
				return this.holes[3];
			break;
			case 'blanc':
				return this.holes[4];
			break;
			case 'jaune':
				return this.holes[5];
			break;
			case 'bleu':
				return this.holes[6];
			break;
			case 'rouge':
				return this.holes[7];
			break;
		}
	},
	isNotTotal: function() {
		return !(this.holes[0] === "Aller" || this.holes[0] === "Retour" || this.holes[0] === "Total");
	},
	tabIndex: function() {
		return index++;
	}
});
