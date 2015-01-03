function initDB(callback) {
	db = window.openDatabase("MusicRunner", "2.0", "Music Runner", 10*1024*1024);
	db.transaction(initTables, dbOnError, callback);

	function initTables(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRACK (id INTEGER PRIMARY KEY, name, path)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS PLAYLIST (id unique, name)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRACK_PLAYLIST (id unique, playlistid, trackid)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS CONFIG (key VARCHAR PRIMARY KEY, value)');
		tx.executeSql('SELECT count(*) from CONFIG', [], function(tx, result) {
			if(result.rows.item(0)["count(*)"] === 0) {
				tx.executeSql("INSERT INTO CONFIG VALUES('last_played_track', '0')");
				tx.executeSql("INSERT INTO CONFIG VALUES('last_played_playlist', '0')");
			}
		});
	}
}

function updateLastPlayed(obj) {
	if(obj.track) {
		
	}
}

function getTracks(opts, callback) {
	db.transaction(function(tx) {
		tx.executeSql("select * from TRACK", [], function(tx, result){
			callback(result);
		}, dbOnError);
	}, dbOnError, function(){});
}

function insertEntries(entries, callback) {
	db.transaction(doInsert, dbOnError, callback);

	function doInsert(tx) {
		for(var i = 0; i < entries.length; i++) {
			var entry = entries[i];
			(function(entry) {
				findTrackByPath(entry.fullPath, function(result) {
					if(result.rows.length === 0) {
						tx.executeSql("INSERT INTO TRACK(name, path) VALUES('" + entry.name + "', '" + entry.fullPath + "')");
					}
				});
			})(entry);
		}

		function findTrackByPath(path, callback) {
			tx.executeSql("select id from TRACK where path = '" + path + "'", [], function(tx, result){
				callback(result);
			}, dbOnError);
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