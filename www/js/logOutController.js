angular.module('app.controllers').controller('logOutCtrl', function ($scope, $state, $http) {
	console.log('logOutCtrl');
	delete $scope.errors;

	$scope.username = localStorage.username;
	$scope.options = false;

	$scope.options_template = {
		must_be_inactive: true,
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
			},
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
			$scope.options = JSON.parse(response.data.options);

		} else {
			$scope.options = $scope.options_template;
		}
	}, function errorCallback(response) {
		$scope.errors = [response];
	});


	$scope.change = function () {
		//this throttles the calls
		if ($scope.change_timeout) clearTimeout($scope.change_timeout);
		$scope.change_timeout = setTimeout(function () {
			//build options object
			console.log($scope);

			/*
			var options = {
				inactive: $scope.options.inactive,
				timers: {}
			};

			for (var t in $scope.options.timers) {
				options.timers[t] = {
					enabled: $scope.options.timers[t].enabled,
					sound: $scope.options.timers[t].sound,
					vibrate: $scope.options.timers[t].vibrate,
				}
			}
			*/

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

		}, 50);
	};


	$scope.logout = function () {
		console.log('logout');
		$scope.isSaving = true;

		$http({
			method: 'POST',
			url: 'https://mafiareturns.com/phone_app.php',
			data: {
				action: 'logout',
				uuid: device.uuid,
				acct_id: localStorage.acct_id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: $scope.ajaxTransform
		}).then(function successCallback(response) {
			$scope.isSaving = false;

			if (response.data.res == 'ok') {
				delete localStorage.logged_in;
				delete localStorage.acct_id;

				$state.go('logIn');
			} else {
				$scope.errors = [response.data.msg];
			}
		}, function errorCallback(response) {
			$scope.isSaving = false;

			$scope.errors = [response];
		});
	};
});
 