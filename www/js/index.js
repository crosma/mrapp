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
        this.bindEvents();

		console.warn("initialize");
    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		console.warn("bindEvents");

        document.addEventListener('deviceready', function() {
			console.log("TESTTESTE");
		}, true);


        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		console.warn("onDeviceReady");

		var $status = $('#status');

		//$status.hide();


		var $form = $('#login');
		$form.show();
		$form.on('submit', function() {
			$form.hide();

			return false;
		});

		//android sender ID 129589237475

		/*
		 var push = PushNotification.init({ "android": {"129589237475": "12345679"},
		 "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );
		 */

		var p = [];
		for (var name in window.plugins) {
			p.push(name);
		}

		$status.text("Ugh " + (typeof PushNotification) + " " + p.join(', '));

		var push = PushNotification.init({
			"android": {"129589237475": "12345679"},
			//"ios": {"alert": "true", "badge": "true", "sound": "true"},
			//"windows": {}
		});

		push.on('registration', function(data) {
			// data.registrationId
		});

		push.on('notification', function(data) {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
		});

		push.on('error', function(e) {
			// e.message
		});


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');



        console.log('Received Event: ' + id);
    }
};
