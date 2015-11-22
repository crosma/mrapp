angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
		.state('loading', {
			url: '/loading',
			templateUrl: 'templates/loading.html',
			controller: 'loadingCtrl'
		})

		.state('logIn', {
			url: '/login',
			templateUrl: 'templates/logIn.html',
			controller: 'logInCtrl'
		})

		.state('loggedIn', {
			url: '/loggedIn',
			abstract: true,
			templateUrl: 'templates/loggedIn.html'
		})
		.state('loggedIn.infoTab', {
			url: '/info',
			views: {
				'tab3': {
					templateUrl: 'templates/infoTab.html',
					controller: 'infoTabCtrl'
				}
			}
		})
		.state('loggedIn.optionsTab', {
			url: '/options',
			views: {
				'tab1': {
					templateUrl: 'templates/optionsTab.html',
					controller: 'optionsTabCtrl'
				}
			}
		})
		.state('loggedIn.logOut', {
			url: '/logout',
			views: {
				'tab2': {
					templateUrl: 'templates/logOutTab.html',
					controller: 'logOutTabCtrl'
				}
			}
		})



	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/loading');
});