// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform, $state, $ionicConfig) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		$ionicConfig.views.transition('none');

		console.log('ready');


		$ionicPlatform.registerBackButtonAction(function () {
			console.log('back button');
		}, 100);

		var push = PushNotification.init({
			"android": {"senderID": "129589237475"},
			//"ios": {"alert": "true", "badge": "true", "sound": "true"},
			//"windows": {}
		});

		push.on('registration', function(data) {
			console.log('push registration');

			window.registrationId = data.registrationId;

			if (localStorage.logged_in) {
				$state.go('logOut');
			} else {
				$state.go('logIn');
			}
		});

		push.on('notification', function() {
			console.log('push notification');
		});

		push.on('error', function() {
			console.log('push error');
		});
	});
});