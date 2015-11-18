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
	version: 20,

    // Application Constructor
    initialize: function() {
		$.support.cors = true; //make sure jquery has cors on

		$('#version').text(this.version);

        this.bindEvents();
    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		var push = PushNotification.init({
			"android": {"senderID": "129589237475"},
			//"ios": {"alert": "true", "badge": "true", "sound": "true"},
			//"windows": {}
		});

		console.log('Trying to register');

		push.on('registration', function (data) {
			// data.registrationId
			console.log('data = ', data);
			console.log('data.registrationId = ', data.registrationId);

			app.registrationId = data.registrationId;

			if (localStorage.logged_in) {
				app.initLoggedIn();
			} else {
				app.initLoggedOut();
			}
		});

		push.on('notification', function (data) {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
			console.log('Push!: ', data);
		});

		push.on('error', function (e) {
			// e.message
			console.error('Push Error: ', e);
		});

	},

	initLoggedOut: function() {
		var $status = $('#status').hide();
		var $error = $('#error').hide();

		var $form = $('#login').show();
		var $username = $('#username');
		var $password = $('#password');

		//prefill form
		$username.val(localStorage.username);
		$password.val(localStorage.password);

		$form.on('submit', function () {
			var username = $username.val();
			var password = $password.val();

			//store form data
			localStorage.username = username;
			localStorage.password = password;

			//hide form and show a logging in message...
			$form.hide();
			$error.hide();
			$status.text('Logging in...').show();

			var jqxhr = $.ajax({
					type: "POST",
					url: "https://mafiareturns.com/login_app.php",
					data: {
						'device': JSON.stringify(device),
						'registrationId': app.registrationId,
						'username': username,
						'password': password
					},
				})
				.done(function (data) {
					console.log("done", arguments);

					$status.hide();

					data = JSON.parse(data);

					if (data.res == 'ok') {
						localStorage.logged_in = true;
						app.initLoggedIn();

					} else if (data.res == 'error') {
						$error.html(data.msg).show();
						$form.show();

						delete localStorage.logged_in;
					}
				})
				.fail(function (jqXHR, textStatus, errorThrown) {
					console.log("fail", arguments);
					
					$status.hide();
					$error.text('Error logging in: ' + textStatus).show();
					$form.show();
				})
				.always(function () {
					console.log("finished", arguments);
				});

			return false;
		});
	},


	initLoggedIn: function() {
		var $status = $('#status').text('This device is logged in as ' + localStorage.username + '. (TODO: ADD LOGOUT BUTTON)').show();
		var $error = $('#error').hide();
		var $form = $('#login').hide();
	}
};


