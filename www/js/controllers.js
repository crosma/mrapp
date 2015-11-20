angular.module('app.controllers', [])

.controller('loadingCtrl', ['$scope','$state', function($scope, $state) {
	console.log('loadingCtrl');


}])


.controller('logInCtrl', function($scope, $state, $http) {
	console.log('logInCtrl');

	$scope.username = localStorage.username;
	$scope.password = localStorage.password;
	delete $scope.errors;

	$scope.login = function() {
		console.log('logging in');
		this.username = this.username ? this.username.trim() : '';
		delete $scope.errors;

		$scope.isSaving = true;

		if (this.username && this.password) {
			localStorage.username = this.username;
			localStorage.password = this.password;

			$http({
				method: 'POST',
				url: 'https://mafiareturns.com/login_app.php',
				data: {
					'action': 'login',
					'device': JSON.stringify(device),
					'registrationId': window.registrationId,
					'username': this.username,
					'password': this.password
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {var str = []; for(var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&");},
			}).then(function successCallback(response) {
				$scope.isSaving = false;

				if (response.data.res == 'ok') {
					localStorage.logged_in = true;
					localStorage.acct_id = response.data.acct_id;

					$state.go('logOut');
				} else {
					$scope.errors = [response.data.msg];
				}
			}, function errorCallback(response) {
				$scope.isSaving = false;

				$scope.errors = [response];
			});
		} else {
			$scope.errors = ['Enter your username and password to log in.'];
		}
	};
})

   
.controller('logOutCtrl', function($scope, $state, $http) {
	console.log('logOutCtrl');

	$scope.username = localStorage.username;
	delete $scope.errors;

	$scope.logout = function(user) {
		console.log('logout');
		$scope.isSaving = true;

		$http({
			method: 'POST',
			url: 'https://mafiareturns.com/login_app.php',
			data: {
				'action': 'logout',
				'uuid': device.uuid,
				'acct_id': localStorage.acct_id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {var str = []; for(var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&");},
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
})


;
 