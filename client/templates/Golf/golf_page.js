Template.golfPage.helpers({
	caca: function() {
		console.log(this);
	},
	images: function() {
		if (this.photos != undefined && this.photos.length > 0) {
			var sliders = [];
			for (var i = 0, c = this.photos.length; i < c; i++) {
				sliders.push('/photos/' + this.photos[i]);
			};
			return sliders;
		}
		return ['http://lorempixel.com/90/90/nature/g' + this.zipCode];
	}
});

Template.golfPage.rendered = function() {
	$(document).ready(function(){
		$('.slider').slider({indicators: false});
	});
	
	Session.set('pageTitle', this.data.golf.name);
};
