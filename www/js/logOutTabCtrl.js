angular.module('app.controllers').controller('logOutTabCtrl', function ($scope, $state, $http) {
	console.log('logOutTabCtrl');

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
