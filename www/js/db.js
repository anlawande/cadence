function initDB(callback) {
	db = window.openDatabase("MusicRunner", "2.0", "Music Runner", 10*1024*1024);
	db.transaction(initTables, dbOnError, callback);

	function initTables(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRACK (id INTEGER PRIMARY KEY, name, path)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS PLAYLIST (id unique, name)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRACK_PLAYLIST (id unique, playlistid, trackid)');
	}
}

function insertEntries(entries, callback) {
	db.transaction(doInsert, dbOnError, callback);

	function doInsert(tx) {
		for(var i = 0; i < entries.length; i++) {
			var entry = entries[i];
			tx.executeSql("INSERT INTO TRACK(name, path) VALUES('" + entry.name + "', '" + entry.fullPath + "')");
		}
	}
}

function truncateTracks(callback) {
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM TRACK');
	}, dbOnError, callback);
}

function dbOnError(err) {
	window.alert("There was a db error");
	console.log("DBError " + arguments);
}