angular.module('app.controllers', [])

	.controller('loadingCtrl', function ($scope, $state, $ionicModal) {
		console.log('loadingCtrl');

	})

	.controller('loggedInCtrl', function ($scope, $state, $ionicModal) {
		console.log('loggedInCtrl');


	})

	.controller('leftNavCtrl', function ($scope, menuService) {
		console.log('leftNavCtrl');

		var frame_source = null;

		$scope.menus = [];

		window.addEventListener("message", receiveMessage, false);
		function receiveMessage(event)
		{
			//if (event.origin !== "http://example.org:8080")
			//	return;


			//console.log(event);
			//console.log('data', event.data);

			console.log('MENUS');

			//event.source.postMessage(['goto', '/profit/pettycrime.php'], event.origin); //


			frame_source = event.source;

			if (event.data[0] == 'menu') {
				console.log(event.data);
				$scope.menus = event.data[1];

				console.log('set menus', $scope.menus);
			}
		}

		$scope.goto = function(url) {
			console.log('GOTO', url)
			frame_source.postMessage(['goto', url], "*");
		};

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
 