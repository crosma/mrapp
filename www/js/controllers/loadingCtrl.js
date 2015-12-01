angular.module('app.controllers').controller('loadingCtrl', function ($scope, $rootScope, $sce) {
	console.log('loadingCtrl');

	$scope.version = '...';

	cordova.getAppVersion.getVersionNumber().then(function (version) {
		$scope.version = version;
	});
});
