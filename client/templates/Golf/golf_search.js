var instance,
	location,
	map,
	markers = [],
	ready = false,
	infoWindow;
var Results = new Meteor.Collection(null);

location = new ReactiveDict();
location.set('latitude', 0);
location.set('longitude', 0);

Template.golfSearch.created = function() {
	GoogleMaps.ready('map', function(Map) {
		// Add a marker to the map once it's ready
		map = Map.instance;
		if (ready)
		{
			draws();
		} else {
			ready = !ready;
		}
	});
};

Template.golfSearch.rendered = function() {
    instance = EasySearch.getComponentInstance({
        id: 'golfSearch',
        index: 'golfs'
    });
};

function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMap(null);
}

function fitBounds() {
	var bounds = new google.maps.LatLngBounds();

	if (markers.length > 1) {
		for(i = 0, c = markers.length; i < c; i++) {
			bounds.extend(markers[i].getPosition());
		}

		map.fitBounds(bounds);
	} else if (markers.length == 1) {
		map.setZoom(14);
		map.setCenter(markers[0].getPosition());
	}
}

function draws() {
	map.setCenter(new google.maps.LatLng(location.get("latitude"), location.get("longitude")));
	new google.maps.Marker({
		position: new google.maps.LatLng(location.get("latitude"), location.get("longitude")),
		map: map,
		title: 'Ta position Dzoo !'
	});

	infoWindow = new google.maps.InfoWindow({
		content: "yo.."
	});

	instance.on('searchResults', function (results) {
		clearMarkers();
		if (results !== undefined && results.length > 0)
		{
			markers = [];
			var distanceMatrix, distanceRequest, origin = new google.maps.LatLng(location.get("latitude"), location.get("longitude")), id;
			for (var i = results.length - 1, marker; i >= 0; i--) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(results[i].latitude, results[i].longitude),
					map: map,
					title: results[i].name,
					html: '<h4>' + results[i].name + '</h4>' + results[i].address1 + '<br />' + results[i].city
				});
				markers.push(marker);

				google.maps.event.addListener(marker, 'click', function (results, i) {
					infoWindow.setContent(this.html);
					infoWindow.open(map, this);
				});

				distanceMatrix  = new google.maps.DistanceMatrixService();
				distanceRequest = { origins: [origin], destinations: [marker.getPosition()], travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.METRIC, avoidHighways: false, avoidTolls: false };
				id              = results[i]._id;
				distanceMatrix.getDistanceMatrix(distanceRequest, callback(id));
			}
			fitBounds();
		}
	});
}

function callback(id) {
	return function(response, status) {
	    if (status != google.maps.DistanceMatrixStatus.OK) {
	        console.error('Error was: ' + status);
	    }
	    else {
			if (Results.findOne(id))
				Results.update(id, {$set: {distance: response.rows[0].elements[0].distance.text}});
			else
				Results.insert({_id: id, distance: response.rows[0].elements[0].distance.text});
	    }
	};
}

function geolocationSuccess(position) {
	// location = position;
	console.log(position);
	location.set('latitude', position.coords.latitude);
	location.set('longitude', position.coords.longitude);

	if (ready)
	{
		draws();
	} else {
		ready = !ready;
	}
}

function geolocationError(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
};

Meteor.startup(function () {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
});

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
	},
	latitude: function() {
		return location.get("latitude");
	},
	longitude: function() {
		return location.get("longitude");
	},
	mapOptions: function() {
		// Make sure the maps API has loaded
		if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(location.get("latitude"), location.get("longitude")),
				zoom: 17
			};
		}
	}
});

// Golf.find().observeChanges({
// 	added: function (id, golf) {
// 		console.log(golf);
// 	}
// });

Template.golfCard.helpers({
	golfDistance: function(id) {
		var doc = Results.findOne(id);
		if (doc)
			return doc.distance;
		else
			return '';
	},
	image: function() {
		if (this.photos != undefined && this.photos.length > 0)
			return '/photos/' + this.photos[0];
		return 'http://lorempixel.com/90/90/nature/g' + this.zipCode;
	}
});
