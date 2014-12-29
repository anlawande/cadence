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
		app.receivedEvent('deviceready');
		//myMedia = new Media("file:///D:/Music/Avenger - Phoebe.mp3");
		var parentElement = document.getElementById('deviceready');
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
			console.log("======= Got fs" + fs.name);

			var musicDir = fs.root.getDirectory("Music", {create: false, exclusive: false}, function(entry) {

				var rdr = entry.createReader();
				rdr.readEntries(function(entries) {
					for(var i = 0; i < entries.length; i++) {
						console.log(entries[i].fullPath);
					}

				}, function(err) {
					console.log("======= ERROR" + err);
				});
			}, function(err) {
				console.log("======= ERROR" + err);
			});
		}, function(err) {
			console.log("======= ERROR" + err);
		});
		/*dirEntry = new DirectoryEntry("/storage/sdcard1");
		var directoryReader = dirEntry.createReader();

		// Get a list of all the entries in the directory
		directoryReader.readEntries(function (entries) {
			var i;
			for (i=0; i<entries.length; i++) {
				receivedElement.innerHTML += entries[i].name;
			}
		},function (error) {
			alert("Failed to list directory contents: " + error.code);
		});*/
		//myMedia.play();
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

app.initialize();