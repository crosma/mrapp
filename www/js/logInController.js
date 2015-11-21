angular.module('app.controllers').controller('logInCtrl', function ($scope, $state, $http) {
	console.log('logInCtrl');

	$scope.username = localStorage.username;
	$scope.password = localStorage.password;
	delete $scope.errors;

	$scope.login = function () {
		console.log('logging in');
		this.username = this.username ? this.username.trim() : '';
		delete $scope.errors;

		if (this.username && this.password) {
			localStorage.username = this.username;
			localStorage.password = this.password;

			$scope.isSaving = true;

			$http({
				method: 'POST',
				url: 'https://mafiareturns.com/phone_app.php',
				data: {
					action: 'login',
					device: JSON.stringify(device),
					registrationId: window.registrationId,
					username: this.username,
					password: this.password
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: $scope.ajaxTransform
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
});
