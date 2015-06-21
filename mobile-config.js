App.info({
	id: 'com.trivagolf',
	name: 'TrivaGolf',
	description: 'Le compagnon du golfeur',
	website: 'http://trivagolf.meteor.com/',
	version: '0.2.0'
});

App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('*gravatar.com*');
App.accessRule('*');

App.icons({
	'android_ldpi': 'private/assets/icons/icon-ldpi.png',
	'android_mdpi': 'private/assets/icons/icon-mdpi.png',
	'android_hdpi': 'private/assets/icons/icon-hdpi.png',
	'android_xhdpi': 'private/assets/icons/icon-xhdpi.png',
	'iphone': 'private/assets/icons/icon-60.png',
	'iphone_2x': 'private/assets/icons/icon-60@2x.png',
	'iphone_3x': 'private/assets/icons/icon-60@3x.png',
	'ipad': 'private/assets/icons/icon-76.png',
	'ipad_2x': 'private/assets/icons/icon-76@2x.png'
});

App.launchScreens({
	'android_ldpi_landscape': 'private/assets/launchScreens/android_ldpi_landscape.png',
	'android_ldpi_portrait': 'private/assets/launchScreens/android_ldpi_portrait.png',
	'android_mdpi_landscape': 'private/assets/launchScreens/android_mdpi_landscape.png',
	'android_mdpi_portrait': 'private/assets/launchScreens/android_mdpi_portrait.png',
	'android_hdpi_landscape': 'private/assets/launchScreens/android_hdpi_landscape.png',
	'android_hdpi_portrait': 'private/assets/launchScreens/android_hdpi_portrait.png',
	'android_xhdpi_landscape': 'private/assets/launchScreens/android_xhdpi_landscape.png',
	'android_xhdpi_portrait': 'private/assets/launchScreens/android_xhdpi_portrait.png',
	'iphone': 'private/assets/launchScreens/iphone.png',
	'iphone_2x': 'private/assets/launchScreens/iphone_2x.png',
	'iphone5': 'private/assets/launchScreens/iphone5.png',
	'iphone6': 'private/assets/launchScreens/iphone6.png',
	'iphone6p_landscape': 'private/assets/launchScreens/iphone6p_landscape.png',
	'iphone6p_portrait': 'private/assets/launchScreens/iphone6p_portrait.png',
	'ipad_landscape': 'private/assets/launchScreens/ipad_landscape.png',
	'ipad_landscape_2x': 'private/assets/launchScreens/ipad_landscape_2x.png',
	'ipad_portrait': 'private/assets/launchScreens/ipad_portrait.png',
	'ipad_portrait_2x': 'private/assets/launchScreens/ipad_portrait_2x.png'
});
