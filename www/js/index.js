/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	version: 0.21,

    // Application Constructor
    initialize: function() {
		$.support.cors = true; //make sure jquery has cors on

		$('#version').text(app.version);

        app.bindEvents();
    },


    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },


    onDeviceReady: function() {
		//initialize push
		var push = PushNotification.init({
			"android": {"senderID": "129589237475"},
			//"ios": {"alert": "true", "badge": "true", "sound": "true"},
			//"windows": {}
		});

		push.on('registration', app.onPushRegistration);
		push.on('notification', app.onPushNotification);
		push.on('error', app.onPushError);

		//get elements
		app.form_login = $('#login');
		app.button_login = app.form_login.find('input[type=submit]');
		app.form_logout = $('#logout');
		app.button_logout = app.form_logout.find('input[type=submit]');
		app.div_message = $('#message');
		app.input_username = $('#username');
		app.input_password = $('#password');

		console.log(app.form_login);
		console.log(app.form_logout);
		console.log(app.div_message);
		console.log(app.input_username);
		console.log(app.input_password);

		//prefill login form
		app.input_username.val(localStorage.username);
		app.input_password.val(localStorage.password);

		//set events
		app.form_login.on('submit', app.onLoginClick);
		app.form_logout.on('submit', app.onLogoutClick);

		//stuff
		app.div_message.hide();
	},


	setStatus: function(msg) {
		app.div_message.removeClass('error');

		if (msg) {
			app.div_message.text(msg).show();
		} else {
			app.div_message.hide();
		}
	},


	setError: function(msg) {
		app.setStatus(msg);
		app.div_message.addClass('error');
	},


	initLoggedOut: function() {
		app.form_login.show();
		app.form_logout.hide();

		app.setStatus(false);
	},


	initLoggedIn: function() {
		app.setStatus('This device is logged in as ' + localStorage.username + '. Logout to disable receiving notifications on this device.');

		app.form_login.hide();
		app.form_logout.show();
	},


	onLoginClick: function(e) {
		console.log('onLoginClick');

		var username = app.input_username.val().trim();
		var password = app.input_password.val();

		//store form data
		localStorage.username = username;
		localStorage.password = password;

		//hide form and show a logging in message...
		app.form_login.hide();
		app.setStatus("Logging in...");

		var jqxhr = $.ajax({
				type: "POST",
				url: "https://mafiareturns.com/login_app.php",
				data: {
					'action': 'login',
					'device': JSON.stringify(device),
					'registrationId': app.registrationId,
					'username': username,
					'password': password
				},
			})
			.done(function (data) {
				console.log("login done", arguments);

				if (data.res == 'ok') {
					localStorage.logged_in = true;
					localStorage.acct_id = data.acct_id;

					app.setStatus(false);
					app.initLoggedIn();

				} else if (data.res == 'error') {
					delete localStorage.logged_in;
					delete localStorage.acct_id;

					app.setError(data.msg);
					app.form_login.show();
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.log("login fail", arguments);
				app.setError('Error logging in: ' + textStatus);
				app.form_login.show();
			});

		return false;
	},


	onLogoutClick: function(e) {
		console.log('onLogoutClick');

		app.form_logout.show();
		app.setStatus("Logging out...");

		var jqxhr = $.ajax({
				type: "POST",
				url: "https://mafiareturns.com/login_app.php",
				data: {
					'action': 'logout',
					'uuid': device.uuid,
					'acct_id': localStorage.acct_id,
				},
			})
			.done(function (data) {
				console.log("logout done", arguments);

				delete localStorage.logged_in;
				delete localStorage.acct_id;
				app.initLoggedOut();

				app.setStatus('You have been logged out.');

			}).fail(function (jqXHR, textStatus, errorThrown) {
				console.log("logout fail", arguments);
				app.form_logout.show();
				app.setError('Error logging out: ' + textStatus);

			});

		return false;
	},


	onPushRegistration: function (data) {
		console.log('data.registrationId = ', data.registrationId);

		app.registrationId = data.registrationId;

		if (localStorage.logged_in) {
			app.initLoggedIn();
		} else {
			app.initLoggedOut();
		}
	},


	onPushNotification: function (data) {
		// data.message,
		// data.title,
		// data.count,
		// data.sound,
		// data.image,
		// data.additionalData
		console.log('Push!: ', data);
	},


	onPushError: function (e) {
		console.error('Push Error: ', e);

		app.setError('Could not register to receive push messages: ' + e.message);
	},
};


