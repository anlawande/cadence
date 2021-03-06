function mockAPIs() {
	if(window.resolveLocalFileSystemURL)
		return;

	console.log("Mocking cordova APIs");
	window.rippleMock = true;

	window.resolveLocalFileSystemURL = function(fileStr, callback) {
		callback({
			name: "Mocked Filesystem",
			getDirectory: getDirectory
		});
	}

	window.Media = window.Audio;
	window.Media.prototype.stop = function() {
		this.pause();
		this.currentTime = 0;
	};
	window.Media.prototype.release = function() {
	};

	function getDirectory (str, obj, callback) {
		callback({
			createReader: createReader
		});
	}

	function createReader() {
		return {
			readEntries: readEntries
		}
	}

	window.mockedEntries = [
		[
			{
				name: 'Armin Van Burren',
				fullPath: 'http://localhost:8000/Music/Armin Van Burren',
				isFile: false,
				isDirectory: true
			},
			{
				name: 'Airbase - Back',
				fullPath: 'http://localhost:8000/Music/Airbase - Back.mp3',
				isFile: true,
				isDirectory: false
			},
			{
				name: 'A.M.R. - Sand Dunes (Daniel Kandi remix)',
				fullPath: 'http://localhost:8000/Music/A.M.R. - Sand Dunes (Daniel Kandi remix).mp3',
				isFile: true,
				isDirectory: false
			}
		],
		[
			{
				name: 'Abstract Vision – Crystal Cource (Ilya Soloviev & Poshout pres. Crystal Design Remix)',
				fullPath: 'http://localhost:8000/Music/New Folder/Abstract Vision – Crystal Cource (Ilya Soloviev & Poshout pres. Crystal Design Remix).mp3',
				isFile: true,
				isDirectory: false
			},
		]
	];

	window.mockedEntries2 = [
		[
			{
				name: 'Armin Van Burren',
				fullPath: 'http://localhost:8000/Music/Armin Van Burren',
				isFile: false,
				isDirectory: true
			},
			{
				name: 'Airbase - Back',
				fullPath: 'http://localhost:8000/Music/Airbase - Back.mp3',
				isFile: true,
				isDirectory: false
			},
			{
				name: 'A.M.R. - Sand Dunes (Daniel Kandi remix)',
				fullPath: 'http://localhost:8000/Music/A.M.R. - Sand Dunes (Daniel Kandi remix).mp3',
				isFile: true,
				isDirectory: false
			},
			{
				name: 'Bjorn Akesson - Paint Pyramids',
				fullPath: 'http://localhost:8000/Music/Bjorn Akesson - Paint Pyramids.mp3',
				isFile: true,
				isDirectory: false
			},
		],
		[
			{
				name: 'Abstract Vision – Crystal Cource (Ilya Soloviev & Poshout pres. Crystal Design Remix)',
				fullPath: 'http://localhost:8000/Music/New Folder/Abstract Vision – Crystal Cource (Ilya Soloviev & Poshout pres. Crystal Design Remix).mp3',
				isFile: true,
				isDirectory: false
			},
		]
	];

	function readEntries(callback) {
		callback(mockedEntries.shift());
	}
	
	if(!window.plugins)
		window.plugins = {};
	window.plugins.toast = {
		showShortBottom: function(msg, success, failure) {
			console.log(msg);
			success();
		}
	};
}