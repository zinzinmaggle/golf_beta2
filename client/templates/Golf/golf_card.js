function getRandomArbitrary(min, max) {
    return (Math.random() * (max - min + 1) + min);
}

Template.golfCard.helpers({
	image: function() {
		if (this.photos != undefined && this.photos.length > 0)
			return '/photos/' + this.photos[0];
		return '/photos/defaut.jpg';
	},
	stars: function() {
		var note  = this.note,
			stars = [];

		for (var i = 0; i < Math.floor(note); i++) {
			stars.push('star');
		}
		if (5 - Math.floor(note) > 0)
			stars.push('star-half');
		for (var i = 0; i < (4 - Math.floor(note)); i++) {
			stars.push('star-outline');
		}

		return stars;
	},
	courses: function() {
		var courses    = Course.find({golf: this._id}).fetch(),
			holes      = {},
			holeCourse = [];

		for (var i = courses.length - 1; i >= 0; i--) {
			if (undefined === holes[courses[i].holeNumber])
				holes[courses[i].holeNumber] = 1;
			else
				holes[courses[i].holeNumber]++;
		}

		for (var key in holes) {
			if (holes.hasOwnProperty(key)) {
				holeCourse.push('' + holes[key] + ' parcours de ' + key + ' trous');
			}
		}

		return holeCourse;
	}
});
