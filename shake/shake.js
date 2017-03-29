
	//摇一摇开关，1表示开，0表示关
	var canShake = 1;
	var lastReasonIndex;
	// 监听设备摇动回调事件
	var SHAKE_THRESHOLD = 4000;
	var last_update = 0;
	var x, y, z, last_x = 0, last_y = 0, last_z = 0;
	function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime-last_update)> 100 && canShake == 1) {
            var diffTime = curTime -last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 30000;
            if (speed > SHAKE_THRESHOLD) {
            	canShake = 0; // 置为不可摇动状态
		        // 获取音频播放元素
		        var myAuto = document.getElementById('musicBox');
		        myAuto.play();
    			changePictureAfterShake(); // 切换图片
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
	}