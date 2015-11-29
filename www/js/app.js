// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'app.config'])

.run(function($ionicPlatform, $rootScope, $state, uiService) {
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


		//fake the device for debugging
		if (!window.device)
		{
			if (!localStorage.fake_uuid) localStorage.fake_uuid = 'uuid_' + Math.random();

			window.device = {
				uuid: localStorage.fake_uuid,
				platform: 'BrowserDebug',
				model: 'Local Debug',
				manufacturer: 'Crosma'
			};
		}

		/*
		$ionicPlatform.registerBackButtonAction(function () {
			console.log('back button');
		}, 100);
		*/

		function login()
		{
			if (localStorage.acct_id) {
				$state.go('menus.main');
			} else {
				uiService.showLoginModal();
			}
		}

		if (typeof PushNotification === 'undefined') {
			setTimeout(function() {
				console.log('fake registration');

				if (!localStorage.registrationId) localStorage.registrationId = 'debug_' + Math.random();

				login();
			}, 200);

		} else {
			var push = PushNotification.init({
				"android": {"senderID": "129589237475"},
				"ios": {"alert": "true", "badge": "true", "sound": "true"},
				"windows": {}
			});

			push.on('registration', function (data) {
				console.log('push registration');

				localStorage.registrationId = data.registrationId;

				login();
			});

			push.on('notification', function (data) {
				// data.message,
				// data.title,
				// data.count,
				// data.sound,
				// data.image,
				// data.additionalData
				console.log('Push!: ', data);

				if (data.additionalData && data.additionalData.info && data.additionalData.info.action) {
					var info = data.additionalData.info;

					if (info.action == 'timer') {
						window.open('http://mafiareturns.com' + info.url, '_system');
					}
				}
			});

			push.on('error', function (e) {
				console.log('push error');
			});
		}



		$rootScope.ajaxTransform = function (obj) {
			var str = [];
			for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");
		};
	});
});