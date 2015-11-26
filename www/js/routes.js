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
				templateUrl: 'templates/menu.html',
				controller: 'menusCtrl'
			})
			.state('menus.tabs', {
				url: '/tabs',
				abstract: true,
				controller: 'tabssCtrl',
				views: {
					'menu-view': {
						templateUrl: 'templates/tabs.html'
					}
				}
			})

			.state('menus.tabs.main', {
				url: '/main',
				views: {
					'main-view': {
						templateUrl: 'templates/main.html',
						controller: 'mainCtrl'
					}
				}
			})
			.state('menus.tabs.chat', {
				url: '/chat',
				views: {
					'chat-view': {
						templateUrl: 'templates/chat.html',
						controller: 'mainCtrl'
					}
				}
			})
			.state('menus.tabs.people', {
				url: '/people',
				views: {
					'people-view': {
						templateUrl: 'templates/people.html',
						controller: 'mainCtrl'
					}
				}
			})

/*
			.state('loading', {
				url: '/loading',
				views: {
					'base-view': {
						templateUrl: 'templates/loading.html',
						controller: 'loadingCtrl'
					}
				}
			})

			.state('logIn', {
				url: '/login',
				views: {
					'base-view': {
						templateUrl: 'templates/logIn.html',
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
		//$urlRouterProvider.otherwise('/sdfsdf/main');
	});

/*

 angular.module('demo', ['ionic'])

 .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

 $stateProvider
 .state('root', {
 url: '/root',
 templateUrl: 'root.html',
 controller: 'RootPageController'
 })

 .state('fst', {
 url: '/fst',
 templateUrl: 'fst-abstract.html',
 abstract: true,
 controller: 'FstController'
 })
 .state('fst.home', {
 url: '/home',
 views: {
 'fst': {
 templateUrl: 'fst-home.html',
 controller: 'FstHomePageController'
 }
 }
 })
 .state('fst.first', {
 url: '/first',
 views: {
 'fst': {
 templateUrl: 'fst-first.html',
 controller: 'FstFirstPageController'
 }
 }
 })
 .state('fst.second', {
 url: '/second',
 views: {
 'fst': {
 templateUrl: 'fst-second.html',
 controller: 'FstSecondPageController'
 }
 }
 })

 .state('snd', {
 url: '/snd',
 templateUrl: 'snd-abstract.html',
 abstract: true,
 controller: 'SndController'
 })
 .state('snd.home', {
 url: '/home',
 views: {
 'snd': {
 templateUrl: 'snd-home.html',
 controller: 'SndHomePageController'
 }
 }
 })
 .state('snd.chat', {
 url: '/chat',
 views: {
 'snd': {
 templateUrl: 'snd-chat.html',
 controller: 'SndChatPageController'
 }
 }
 })
 .state('snd.chat-single', {
 url: '/chat-single',
 views: {
 'snd': {
 templateUrl: 'snd-chat-single.html',
 controller: 'SndChatSinglePageController'
 }
 }
 })
 .state('snd.drink', {
 url: '/drink',
 views: {
 'snd': {
 templateUrl: 'snd-drink.html',
 controller: 'SndDrinkPageController'
 }
 }
 })
 .state('snd.policy', {
 url: '/policy',
 views: {
 'snd': {
 templateUrl: 'snd-policy.html',
 controller: 'SndPolicyPageController'
 }
 }
 })

 $urlRouterProvider.otherwise('/root');
 }])

 */