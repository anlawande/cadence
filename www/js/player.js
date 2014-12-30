$(function(){
	$(".playBtn").on("click", function() {
		if(currMedia.isPlaying) {
			currMedia.media.stop();
			currMedia.media.release();
		}
		currMedia.media = new Media(window.fileList[1].fullPath);
		currMedia.media.play();
		currMedia.isPlaying = true;
		$(".fileEntry").html(window.fileList[1].name);
	});
	$(".stopBtn").on("click", function() {
		if(!currMedia.media)
			return;
		currMedia.media.stop();
		currMedia.media.release();
		currMedia.isPlaying = false;
	});
});