function mockAPIs() {
	if(window.resolveLocalFileSystemURL)
		return;
	
	console.log("Mocking cordova APIs");
	
	window.resolveLocalFileSystemURL = function(fileStr, callback) {
		callback({
			name: "Mocked Filesystem",
			getDirectory: getDirectory
		});
	}
		
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
	
	function readEntries(callback) {
		callback([
			{
				name: 'Airbase - Back',
				fullPath: 'file:///D:/Music/Airbase - Back.mp3',
				isFile: true
			}
		]);
	}
}