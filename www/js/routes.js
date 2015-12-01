angular.module('app.routes', [])

	.config(function ($stateProvider, $urlRouterProvider) {
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

			.state('menus', {
				url: '/menus',
				abstract: true,
				templateUrl: 'templates/menus.html',
				controller: 'menusCtrl'
			})
			.state('menus.main', {
				url: '/main',
				views: {
					'menu-view': {
						templateUrl: 'templates/main.html',
						controller: 'mainCtrl'
					}
				}
			})
			.state('menus.mainloading', {
				url: '/mainloading',
				views: {
					'menu-view': {
						templateUrl: 'templates/main.loading.html'
					}
				}
			})
			.state('menus.chat', {
				url: '/chat',
				views: {
					'menu-view': {
						templateUrl: 'templates/chat.html',
						controller: 'mainCtrl'
					}
				}
			})
			.state('menus.people', {
				url: '/people',
				views: {
					'menu-view': {
						templateUrl: 'templates/people.html',
						controller: 'peopleCtrl'
					}
				}
			})


			.state('loading', {
				url: '/loading',
				templateUrl: 'templates/loading.html',
				controller: 'loadingCtrl'
			})


			/*
			.state('logIn', {
				url: '/login',
				views: {
					'base-view': {
						templateUrl: 'templates/login.html',
						controller: 'logInCtrl'
					}
				}
			})

			.state('menus.tabs', {
				url: '/tabs',
				views: {
					'menus-view': {
						templateUrl: 'templates/tabs.html',
						//controller: 'mainTabCtrl'
					}
				}
			})

			.state('loggedIn.mainTab', {
				url: '/main',
				views: {
					'main-tab-view': {
						templateUrl: 'templates/mainTab.html',
						controller: 'mainTabCtrl'
					}
				}
			})



			.state('loggedIn.optionsTab', {
				url: '/options',
				views: {
					'options-tab-view': {
						templateUrl: 'templates/optionsTab.html',
						controller: 'optionsTabCtrl'
					}
				}
			})
			.state('loggedIn.logOut', {
				url: '/logout',
				views: {
					'options-tab-view': {
						templateUrl: 'templates/logOutTab.html',
						controller: 'logOutTabCtrl'
					}
				}
			})

			*/
		;

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/loading');
	});