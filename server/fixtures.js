

if (Region.find().count() === 0) {
	var dbRegion = [];
	dbRegion = JSON.parse(Assets.getText("assets/region.json"));
	for (var i = dbRegion.length - 1; i >= 0; i--) {
		Region.insert(dbRegion[i]);
	};
}

if (Golf.find().count() === 0) {
	var dbGolf = [];
	dbGolf = JSON.parse(Assets.getText("assets/golf.json"));
	for (var i = dbGolf.length - 1; i >= 0; i--) {
		Golf.insert(dbGolf[i]);		
	};
}
