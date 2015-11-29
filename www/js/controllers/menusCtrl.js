angular.module('app.controllers').controller('menusCtrl', function ($scope, $rootScope, uiService, $ionicModal, $ionicScrollDelegate, $state, $ionicSideMenuDelegate) {
	console.log('menusCtrl');

	/********************************************************************
	 ****** Handle header stuff
	 *******************************************************************/
	$scope.$on('ui-data', function (event, d) {

	});

	$scope.$on('ui-push-mobmail', function (event, data, msg_id) {

	});

	$scope.$on('ui-push-personal', function (event, data, msg_id) {

	});

	$scope.mail = 0;
	$scope.grant = 0;
	$scope.$on('ui-update_mail', function (event, mail, grant) {
		$scope.$apply(function () {
			console.log('update mail', mail, grant);
			$scope.mail = mail;
			$scope.grant = grant;
		});
	});

	$scope.personal_icon = 'ion-android-notifications-none';
	$scope.$on('ui-update_personals', function (event, personals) {
		$scope.$apply(function () {
			$scope.personal_icon = personals > 0 ? 'ion-android-notifications' : 'ion-android-notifications-none';
		});
	});

	$scope.update_mail = function (mail, grant) {

	};

	$scope.current_state = 'menus.main';
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		$scope.current_state = toState.name;
	});


	$scope.showMenuLeft = function () {
		$ionicSideMenuDelegate.toggleRight(false);
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.showMenuRight = function () {
		$ionicSideMenuDelegate.toggleLeft(false);
		$ionicSideMenuDelegate.toggleRight();
	};


	/********************************************************************
	 ****** Handle right menu stuff
	 *******************************************************************/
	$scope.$on('ui-data', function (event, d) {
		$scope.$apply(function () {
			if (d.username) {
				$scope.username = d.username;
				$scope.user_id = d.user_id;
			}

			if (d.title) {
				$scope.title = d.title;
			}

			$scope.cash = d.cash;
			$scope.location = d.location;
		});
	});

	$scope.$on('ui-push-cash', function (event, cash) {
		$scope.$apply(function () {
			$scope.cash = cash;
		});
	});

	$scope.$on('ui-clock', function (event, clock) {
		$scope.$apply(function () {
			$scope.clock = clock;
		});
	});


	$scope.open_travel = function () {
		uiService.open_travel();
	};

	$scope.handle_link = function ($event) {
		console.log('handle_link', $event.target);

		uiService.goto($event.target.getAttribute('url'));

		$state.go('menus.main');
	};


	/********************************************************************
	 ****** Handle left menu stuff
	 *******************************************************************/
	$scope.menus = false;
	$scope.shownSection = null;

	$scope.$on('menu-data', function (event, menus) {
		$scope.$apply(function () {
			var sections = [];

			for (var section_name in menus) {
				sections.push({
					name: section_name,
					groups: menus[section_name],
					open: false
				});
			}

			$scope.menus = sections;
		});
	});

	$scope.toggleSection = function (group) {
		if ($scope.isSectionShown(group)) {
			$scope.shownSection = null;
		} else {
			$scope.shownSection = group;
		}

		//make the scroll height update
		$ionicScrollDelegate.resize();
	};
	$scope.isSectionShown = function (group) {
		//return true;
		return $scope.shownSection === group;
	};
	$scope.goto = function (link) {
		setTimeout(function () {
			$scope.shownSection = null;
		}, 200);

		$state.go('menus.main');

		uiService.goto(link.url);
	};
});
