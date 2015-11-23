angular.module('app.controllers').controller('optionsTabCtrl', function ($scope, $state, $http, $ionicHistory) {
	console.log('optionsTabCtrl');
	$ionicHistory.clearHistory();
	$ionicHistory.clearCache();

	delete $scope.errors;

	$scope.username = localStorage.username;
	$scope.show_options = false;
	$scope.options = {
		timer_notifications: true,
		must_be_inactive: true,
		sound: true,
		vibrate: true,
		timers: {
			mia_ready: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'MIA'
			},
			custom_timer: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'Custom'
			},
			last_petty: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'Petty'
			},
			last_felony: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'Felony'
			},
			last_travel: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'Flight'
			},
			last_attack: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'Attack'
			},
			last_pickpocket: {
				enabled: true,
				sound: true,
				vibrate: true,
				title: 'Pickpocket'
			}
		}
	};


	//load options
	$http({
		method: 'POST',
		url: 'https://mafiareturns.com/phone_app.php',
		data: {
			action: 'options_load',
			uuid: device.uuid,
			acct_id: localStorage.acct_id
		},
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: $scope.ajaxTransform
	}).then(function successCallback(response) {
		console.log(response);

		if (response.data.options) {
			var o = JSON.parse(response.data.options);

			$scope.options.timer_notifications = 'timer_notifications' in o ? o.timer_notifications : true;
			$scope.options.must_be_inactive = 'must_be_inactive' in o ? o.must_be_inactive : true;
			$scope.options.no_sound = !!o.must_be_inactive;
			$scope.options.no_vibrate = !!o.no_vibrate;

			for (var t in $scope.options.timers) {
				$scope.options.timers[t].enabled = o.timers[t].enabled;
				$scope.options.timers[t].sound = o.timers[t].sound;
				$scope.options.timers[t].vibrate = o.timers[t].vibrate;
			}
		}

		$scope.show_options = true;
	}, function errorCallback(response) {
		$scope.errors = [response];
	});


	$scope.change = function () {
		//this throttles the calls
		if ($scope.change_timeout) clearTimeout($scope.change_timeout);
		$scope.change_timeout = setTimeout(function () {
			//build options object
			console.log($scope);

			//save it
			$http({
				method: 'POST',
				url: 'https://mafiareturns.com/phone_app.php',
				data: {
					action: 'options_save',
					uuid: device.uuid,
					acct_id: localStorage.acct_id,
					options: JSON.stringify($scope.options)
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: $scope.ajaxTransform
			}).then(function successCallback(response) {
				if (response.data.res == 'ok') {

				} else {

				}
			}, function errorCallback(response) {
				$scope.errors = [response];
			});

		}, 2500);
	};

});
