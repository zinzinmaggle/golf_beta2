

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
	Golf._ensureIndex({ pos : "2d" });
}

if (Course.find().count() === 0) {
	var dbCourse = [];
	dbCourse = JSON.parse(Assets.getText("assets/course.json"));
	for (var i = dbCourse.length - 1; i >= 0; i--) {
		Course.insert(dbCourse[i]);		
	};
}
