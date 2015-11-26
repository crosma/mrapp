angular.module('app.services', [])

	.factory('BlankFactory', [function () {

	}])

	.service('uiService', [function () {
		console.log('uiService', this);

		//all functions need to be defined before the initialization code and such
		var handleMessage = function(event) {
			postMessageSource = event.source;

			if (event.data[0] == 'menu') {
				if (this.onMenuData) this.onMenuData(event.data[1]);
			}
		};

		var sendToUI = function(what, data) {
			if (postMessageSource) postMessageSource.postMessage([what, data], "*");
		};

		this.goto = function(url) {
			sendToUI('goto', url);
		};

		//stuff
		var postMessageSource = null;

		//callbacks
		this.onMenuData = null;

		//do things
		window.addEventListener("message", handleMessage.bind(this), false);

	}])
