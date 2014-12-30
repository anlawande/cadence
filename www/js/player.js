$(function(){
	$(".playBtn").on("click", function() {
		currMedia = new Media(window.fileList[1].fullPath);
		currMedia.setVolume(0.4);
		currMedia.play();
	});
});