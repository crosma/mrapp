angular.module('app.services', [])

	.factory('BlankFactory', [function () {

	}])

	.service('uiService', function ($rootScope, $ionicModal, $ionicLoading, $state) {

		this.showLoginModal = function () {
			$ionicModal.fromTemplateUrl('templates/login.html', {
				scope: null,
				animation: 'animation',
				focusFirstInput: true,
				backdropClickToClose: false,
				hardwareBackButtonClose: false
			}).then(function (modal) {
				$rootScope.modal = modal;
				$rootScope.modal.show();
			});
		};

		//all functions need to be defined before the initialization code and such
		var handleMessage = function (event) {
			postMessageSource = event.source;

			var what = event.data[0];
			var data = event.data[1];
			var func = this['command_' + what];

			if (func) {
				func.apply(this, data);
			} else {
				console.error('APP LEVEL Mobile command "' + what + '" not found.');
			}
		};

		var sendToUI = function (what, data) {
			data = data || {};

			if (postMessageSource) postMessageSource.postMessage([what, data], "*");
		};

		this.goto = function (url) {
			sendToUI('goto', url);
		};

		this.open_travel = function () {
			sendToUI('open_travel')
		};


		/**************************************************************************************
		 ***** Command handlers
		 *************************************************************************************/
		this.command_menu = function (menus) {
			$rootScope.$broadcast('menu-data', menus);
		};

		this.command_ui = function (d) {
			console.log('ui data', d);

			//stuff needed by more than one subscriber
			d.cash = '$' + d.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			//broadcast data
			$rootScope.$broadcast('ui-data', d);

			$ionicLoading.hide();
		};

		this.command_push = function (args) {
			console.log('PUSH', args);

			var what = args[0];
			var data = args[1];
			var msg_id = args[2];

			//broadcast data
			$rootScope.$broadcast('ui-push-' + what, data, msg_id);
		};

		this.command_update_personals = function (personals) {
			$rootScope.$broadcast('ui-update_personals', personals);
		};

		this.command_update_mail = function (mail, grant) {
			$rootScope.$broadcast('ui-update_mail', mail, grant);
		};

		this.command_clock = function (data) {
			$rootScope.$broadcast('ui-clock', data);
		};

		this.command_bad_login = function () {
			delete localStorage.acct_id;

			this.showLoginModal();
		};

		this.command_ss_data = function (userinfo, friends) {
			console.log('ss', this);

			this.data_userinfo = userinfo;
			this.data_friends = friends;

			$rootScope.$broadcast('ui-ss_data');
		};

		//stuff
		var postMessageSource = null;

		this.data_userinfo = null;
		this.data_friends = null;

		//do things
		window.addEventListener("message", handleMessage.bind(this), false);

	})
