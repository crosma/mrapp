angular.module('app.services', [])

	.factory('BlankFactory', [function () {

	}])

	.service('sharedProperties', [function () {

	}])

	.factory('menuService', function () {
		var data = [];
		var menuService = {
			update: null
		};

		menuService.setData = function(value) {
			console.log('menu setData', value);
			data = value;
			menuService.update(data);
		};
		menuService.getData = function() {
			return data;
		};



		return menuService;
	});