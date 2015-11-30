angular.module('app.controllers').controller('mainCtrl', function ($scope, $rootScope, $sce, $stateParams, $ionicLoading) {
	console.log('mainCtrl');

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		if (toState.name == 'menus.main') {
			set_url();
		}
	});


	var last_acct_id = null;

	function set_url() {
		console.log('params', $stateParams);

		if (last_acct_id != localStorage.acct_id && localStorage.acct_id) {
			last_acct_id = localStorage.acct_id;

			$ionicLoading.show({
				template: 'Loading...'
			});

			var url = "https://mafiareturns.com/login_app.php?is_mobile=true"
				+ "&uuid=" + encodeURIComponent(device.uuid)
				+ "&acct_id=" + encodeURIComponent(localStorage.acct_id)
				+ "&registrationId=" + encodeURIComponent(localStorage.registrationId)
				+ "&r=" + (+(new Date()));

			$scope.url = $sce.trustAsResourceUrl(url);
		}
	}

	set_url();
});
