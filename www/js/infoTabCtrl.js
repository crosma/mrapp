angular.module('app.controllers').controller('infoTabCtrl', function ($scope, $state, $http) {
	console.log('infoTabCtrl');

	$scope.username = localStorage.username;
});
