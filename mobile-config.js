App.info({
	name: 'TrivaGolf',
	description: 'L\'appli du golfeur',
	version: '0.1.0'
});

App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('*gravatar.com*');
App.accessRule('*');

// App.icons({
// 	'android_ldpi': 'resources/icons/icon-ldpi.png',
// 	'android_mdpi': 'resources/icons/icon-mdpi.png',
// 	'android_hdpi': 'resources/icons/icon-hdpi.png',
// 	'android_xhdpi': 'resources/icons/icon-xhdpi.png'
// });
