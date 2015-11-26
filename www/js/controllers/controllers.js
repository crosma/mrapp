angular.module('app.controllers', [])

	.controller('loadingCtrl', function ($scope, $state, $ionicModal) {
		console.log('loadingCtrl');

	})

	.controller('loggedInCtrl', function ($scope, $state, $ionicModal) {
		console.log('loggedInCtrl');


	})

	.controller('rightNavCtrl', function ($scope, $state, $ionicModal) {
		console.log('rightNavCtrl');

		$scope.yar = 'YARRR';

	})



	.controller('tabsCtrl', function($scope, $ionicSideMenuDelegate, $ionicTabsDelegate) {
		$scope.menuActive = false;

		$scope.showMenuLeft = function () {
			$ionicSideMenuDelegate.toggleRight(false);
			$ionicSideMenuDelegate.toggleLeft();
		};

		$scope.showMenuRight = function () {
			$ionicSideMenuDelegate.toggleLeft(false);
			$ionicSideMenuDelegate.toggleRight();
		};
	})
;
 