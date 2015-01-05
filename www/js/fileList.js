function getFiles() {
	var listPromise = new jQuery.Deferred();
	var linFileList = [];
	var fileSystem;
	var pcqueue = new PCQueue({
		maxParallel: 2,
		tree: true
	});

	pcqueue.treeNotify(function() {
		listPromise.resolve(linFileList);
	});

	window.resolveLocalFileSystemURL("file:///storage/sdcard1", function(fs) {
		fileSystem = fs;
		console.log("======= Got fs " + fs.name);

		var musicDir = fs.getDirectory("Music", {create: false, exclusive: false}, recursFindFiles, handleError);
	}, function(err) {
		console.log("======= ERROR" + err);
	});

	function recursFindFiles(entry) {

		pcqueue.produce(function() {
			var promise = new jQuery.Deferred();

			var rdr = entry.createReader();
			rdr.readEntries(function(entries) {
				/*for(var i = 0; i < entries.length; i++) {
				}*/
				/*entry.getFile(entries[7].name, null, function(fileEntry) {
					fileEntry.file(function(file) {
						var reader = new FileReader();
						console.log("====== " + file.name);
						reader.onloadend = function(evt) {
							console.log("Read as data URL");
							console.log(evt.target.result);
						};
						reader.readAsDataURL(file);
					}, function(err) {
						console.log("======= ERROR" + err);
					});
				}, function(err) {
					console.log("======= ERROR" + err);
				});*/
				var numDirectory = entries.filter(function(a) {
					return a.isDirectory;
				}).length;
				pcqueue.children(numDirectory);

				for(var i = 0; i < entries.length; i++) {
					if(entries[i].isDirectory) {
						fileSystem.getDirectory("/"+entries[i].fullPath, {create: false, exclusive: false}, recursFindFiles, handleError);
					}
					if(entries[i].isFile)
						linFileList.push(entries[i]);
				}

				promise.resolve();

			}, function(err) {
				console.log("======= ERROR" + err);
				promise.reject();
			});

			return promise;
		});
	}

	function handleError(err) {
		console.log("======= ERROR" + err);
	}

	return listPromise.promise();
}

app.controller("listCtrl", function($scope) {
	$scope.tracks = [];
	$scope.playlists = [];
	$scope.currentTab = "playlist";

	$scope.updateTrackList = function() {
		$scope.tracks = window.tracks;
	}
	
	$scope.updateTrackList();
	
	$scope.tabClick = function(tab) {
		$scope.currentTab = tab;
	}
});