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
    // Application Constructor
    initialize: function() {
		$.support.cors = true; //make sure jquery has cors on

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

			app.initForm();
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

	initForm: function() {
		var $status = $('#status');
		$status.hide();

		var $form = $('#login');
		$form.show();
		$form.on('submit', function () {
			$form.hide();

			return false;
		});



		var jqxhr = $.ajax({
				type: "POST",
				url: "https://mafiareturns.com/login_app.php",
				data: {
					'device': 'android',
					'registrationId': app.registrationId,
					'username': 'UNAMEE',
					'password': 'PASS'
				},
			})
			.done(function () {
				console.log("second success", arguments);
			})
			.fail(function () {
				console.log("error", arguments);
			})
			.always(function () {
				console.log("finished", arguments);
			});
	},
};


