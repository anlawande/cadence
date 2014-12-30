function getFiles() {
	listPromise = new jQuery.Deferred();

	window.resolveLocalFileSystemURL("file:///storage/sdcard1", function(fs) {
		console.log("======= Got fs" + fs.name);

		var musicDir = fs.getDirectory("Music", {create: false, exclusive: false}, function(entry) {

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
				entries = entries.filter(function(entry) {
					return entry.isFile;
				});
				listPromise.resolve(entries);
			}, function(err) {
				console.log("======= ERROR" + err);
			});
		}, function(err) {
			console.log("======= ERROR" + err);
		});
	}, function(err) {
		console.log("======= ERROR" + err);
	});

	return listPromise.promise();
}