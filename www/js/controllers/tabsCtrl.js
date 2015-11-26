angular.module('app.controllers').controller('tabsCtrl', function($scope, $ionicSideMenuDelegate, $ionicTabsDelegate) {
	$scope.menuActive = false;

	$scope.showMenuLeft = function () {
		$ionicSideMenuDelegate.toggleRight(false);
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.showMenuRight = function () {
		$ionicSideMenuDelegate.toggleLeft(false);
		$ionicSideMenuDelegate.toggleRight();
	};
});
