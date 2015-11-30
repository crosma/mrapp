angular.module('app.controllers').controller('loginCtrl', function ($scope, $rootScope, $state, $http, $ionicHistory) {
	console.log('loginCtrl');
	//$ionicHistory.clearHistory();
	//$ionicHistory.clearCache();

	$scope.username = localStorage.username;
	//$scope.password = localStorage.password;
	delete $scope.errors;

	$scope.login = function () {
		console.log('logging in');
		this.username = this.username ? this.username.trim() : '';
		delete $scope.errors;

		if (this.username && this.password) {
			localStorage.username = this.username;
			//localStorage.password = this.password;

			$scope.isSaving = true;

			$http({
				method: 'POST',
				url: 'https://mafiareturns.com/phone_app.php',
				data: {
					action: 'login',
					device: JSON.stringify(device),
					registrationId: localStorage.registrationId,
					username: this.username,
					password: this.password
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: $rootScope.ajaxTransform
			}).then(function successCallback(response) {
				$scope.isSaving = false;

				if (response.data.res == 'ok') {
					localStorage.acct_id = response.data.acct_id;


					console.log('LOGGED IN GOING TO menus.main');
					$state.go('menus.main');

					//use a timeout to avoid there being much flicker
					setTimeout(function() {
						$rootScope.modal.hide();
					}, 0);
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
