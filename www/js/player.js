$(function(){
	$(".playBtn").on("click", function() {
		if(currMedia.isPlaying) {
			currMedia.media.stop();
			currMedia.media.release();
		}
		currMedia.media = new Media(window.fileList[0].fullPath);
		//Ripple mock
		if(window.rippleMock)
			currMedia.media.volume = 0.1;
		currMedia.media.play();
		currMedia.isPlaying = true;
		$(".fileEntry").html(window.fileList[0].name);
	});
	$(".stopBtn").on("click", function() {
		if(!currMedia.media)
			return;
		currMedia.media.stop();
		currMedia.media.release();
		currMedia.isPlaying = false;
	});
});