angular.module('app.controllers').controller('infoTabCtrl', function ($scope, $state, $http, $ionicHistory) {
	console.log('infoTabCtrl');

	$scope.username = localStorage.username;

	$ionicHistory.clearHistory();
	$ionicHistory.clearCache();
});
