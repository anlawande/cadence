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
		mockAPIs();
		initDB(function() {
		});
		app.receivedEvent('deviceready');
		$(".ui-loader").remove();

		$(".updateBtn").on("click", function(){
			getFiles().then(function(entries) {
				console.log("Found " + entries.length + " music files");
				insertEntries(entries, function() {
					getTrackList();
					window.plugins.toast.showShortBottom('Update complete', function(){}, function(){});
				});
			});
		});
		$(".truncateBtn").on("click", function(){
			truncateTracks(function(){});
		});

		window.getTrackList = function() {
			getTracks({}, function(result) {
				window.tracks = [];
				if(result.rows.length > 0) {
					for(var i = 0; i < result.rows.length; i++) {
						var track = result.rows.item(i);
						var entry = $("<div class='fileEntry'>" + track.name + "</div>");
						$("#fileList").append(entry);
						tracks.push(track);
					}
					window.loadTrack(result.rows.item(0));
				}
			});
		}
		getTrackList();
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		/*var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');*/

		console.log('Received Event: ' + id);
	}
};

app.initialize();