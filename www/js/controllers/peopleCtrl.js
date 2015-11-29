angular.module('app.controllers').controller('peopleCtrl', function ($scope, $rootScope, $state, uiService) {
	console.log('peopleCtrl');

	var currently_viewed = true;
	var data_updated = true;

	$scope.$on('ui-ss_data', function (event) {
		if (currently_viewed) {
			data_updated = true;

			$scope.$apply(function() {
				$scope.userinfo = uiService.data_userinfo;
			});

		} else {
			data_updated = true;
		}
	});

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		if (toState.name == 'menus.people') {
			currently_viewed = true;

			update_ss();
		} else {
			currently_viewed = false;

		}
	});


	function update_ss() {
		if (data_updated) {
			$scope.userinfo = uiService.data_userinfo;

			data_updated = false;
		}
	}


	$scope.handle_link = function ($event) {
		console.log('handle_link', $event.target);

		uiService.goto($event.target.getAttribute('url'));

		$state.go('menus.main');
	};


	update_ss();
});
