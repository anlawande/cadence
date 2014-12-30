function getFiles() {
	listPromise = new jQuery.Deferred();
	
	window.resolveLocalFileSystemURL("file:///storage/sdcard1", function(fs) {
		console.log("======= Got fs" + fs.name);

		var musicDir = fs.getDirectory("Music", {create: false, exclusive: false}, function(entry) {

			var rdr = entry.createReader();
			rdr.readEntries(function(entries) {
				/*for(var i = 0; i < entries.length; i++) {
				}*/
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