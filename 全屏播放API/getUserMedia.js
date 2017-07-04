// 调用这个 API ，加上 <video> 和 <canvas> 标记，可以在浏览器里进行拍照
// Put event Listeners into place
window.addEventListener('DOMContentLoaded', function () {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById('canvas');
	var content = canvas.getContext('2d');
	var video = document.getElementById('video');
	var videoObj = {
		'video': true
	};
	var errBack = function (error) {
		console.log('Video capture error: ' + error.code);
	};

	// Put video listeners into place
	if (navigator.getUserMedia) {
		navigator.getUserMedia(videoObj, function (stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if (navigator.webkitGetUserMedia) { // webkit
		navigator.webkitGetUserMedia(videoObj, function (stream) {
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
}, false);