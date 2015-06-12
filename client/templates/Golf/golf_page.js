function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

Template.golfPage.helpers({
	caca: function() {
		console.log(this);
		return null;
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
	},
	formatMinutes: function(minutes) {
		var str = '';
		if (minutes > 60) {
			var hours = Math.floor(minutes / 60);
			str = '' + pad(hours, 2) + ':' + pad(minutes - (hours*60), 2);
		} else {
			str = '' + minutes;
		}

		return str;
	},
	formatNumber: function(number) {
		if (parseInt(number) !== NaN)
		{
			if (parseInt(number) >= 1000)
			{
				return numberWithCommas(parseInt(number));
			}
		}
		return number;
	}
});

Template.golfPage.rendered = function() {
	$(document).ready(function(){
		$('.slider').slider({indicators: false});
	});

	Session.set('pageTitle', this.data.golf.name);
};
