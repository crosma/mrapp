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

		.state('logOut', {
			url: '/logout',
			templateUrl: 'templates/logOut.html',
			controller: 'logOutCtrl'
		})

	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/loading');
});