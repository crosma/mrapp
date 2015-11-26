angular.module('app.controllers').controller('leftNavCtrl', function ($scope, uiService) {
	console.log('leftNavCtrl');

	var frame_source = null;

	$scope.menus = [];

	uiService.onMenuData = function (menus) {
		var sections = [];

		for (var section_name in menus) {
			sections.push({
				name: section_name,
				groups: menus[section_name],
				open: false
			});
		}

		$scope.menus = sections;
	};


	$scope.shownSection = null;
	$scope.toggleSection = function (group) {
		if ($scope.isSectionShown(group)) {
			$scope.shownSection = null;
		} else {
			$scope.shownSection = group;
		}
	};
	$scope.isSectionShown = function (group) {
		//return true;
		return $scope.shownSection === group;
	};

	//goto a page....
	$scope.goto = function (link) {
		console.log('GOTO', link.url);

		setTimeout(function () {
			$scope.shownSection = null;
		}, 200);

		uiService.goto(link.url);
	};

});
