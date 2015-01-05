window.app = angular.module("MusicRunner", ['ngRoute']);

app.controller("player", ["$scope", function($scope) {
	$scope.currentMedia = {};
	var currMedia = $scope.currentMedia;
	currMedia.lastPlayed = {};

	$scope.loadTrack = function(track) {
		currMedia.lastPlayed = track;
		updateLastPlayed(track);
		//		$scope.$digest();
	}
	window.loadTrack = $scope.loadTrack;

	$scope.playClick = function() {
		if(currMedia.isPlaying) {
			currMedia.media.stop();
			currMedia.media.release();
		}
		if(!currMedia.lastPlayed.path) {
			
		}
		currMedia.media = new Media(currMedia.lastPlayed.path);
		//Ripple mock
		if(window.rippleMock)
			currMedia.media.volume = 0.1;
		currMedia.media.play();
		currMedia.isPlaying = true;
	};

	$scope.stopClick = function() {
		if(!currMedia.media)
			return;
		currMedia.media.stop();
		currMedia.media.release();
		currMedia.isPlaying = false;
	};
}]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false);
	$routeProvider.
	when('/', {
		templateUrl: 'templates/main.html',
		controller: 'mainCtrl'
	})
	.when('/playlist/:mode/:playlistid?', {
		templateUrl: 'templates/playlist.html',
		controller: 'playlist'
	}).
	when('/list', {
		templateUrl: 'templates/fileList.html',
		controller: 'listCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

app.controller("mainCtrl", function($scope) {
	$scope.displayMsg = "";
});

app.controller("playlist", ["$scope", "$routeParams", function($scope, $routeParams) {
	$scope.mode = $routeParams.mode;
	$scope.playlistid = $routeParams.playlistid;
	
	if($scope.mode === "new") {
		$scope.playlist = {};
		$scope.tracks = window.tracks;
	}
}]);