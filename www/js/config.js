angular.module('app.config', [])
	.config(function ($ionicConfigProvider) {
		$ionicConfigProvider.views.maxCache(5);

		// note that you can also chain configs
		$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');

		$ionicConfigProvider.views.transition('none');

		$ionicConfigProvider.tabs.position('bottom');


		//ionic.Platform.showStatusBar(false);

		console.log('CONFIG');
	});