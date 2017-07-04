// 全屏调起
function launchFullScreen (element) {
	if (element.requestFullScreen) {
		element.requestFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	} else if (element.msRequestFullScreen) {
		element.msRequestFullScreen();
	} else {
		alert('该元素不支持全屏播放');
	}
}

launchFullScreen(document.documentElement); // the whole page
launchFullScreen(document.getElementById('videoElement')); // any invidual

// 退出全屏
function exitFullScreen () {
	if (document.exitFullScreen) {
		document.exitFullScreen();
	} else if (document.mozExitFullScreen) {
		document.mozExitFullScreen();
	} else if (document.webkitExitFullScreen) {
		document.webkitExitFullScreen();
	} else if (msExitFullScreen) {
		document.msExitFullScreen();
	} else {
		alert('您的设备不支持退出全屏')
	}
}

document.fullScreenElement; // 全屏显示的网页元素
document.fullScreenEnabled; // 判断当前是否处于全屏状态
// fullscreenchange 事件会在启动全屏或退出全屏时触发