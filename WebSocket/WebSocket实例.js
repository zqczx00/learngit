
var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function(event) {
	console.log('Connection open ...');
	ws.send("Hello WebSockets");
}

ws.onmessage = function(event) {
	console.log('Received Message: ' + event.data);
	ws.close();
}

ws.onclose = function(event) {
	console.log('Connection closed.');
}

// WebSocket 客户端 API
// 1、构造函数
	var ws = new WebSocket('ws://localhost:8080');
// 执行完上面语句之后，客户端就会与服务器进行连接。

// 2、webSocket.readyState
// readyState 属性返回实例对象的当前状态，共有四种
// CONNECTING: 值为 0，表示正在连接。
// OPEN: 值为 1，表示连接成功，可以通信了。
// CLOSING: 值为 2，表示连接正在关闭。
// CLOSED: 值为3，表示连接已经关闭，或者打开链接失败。
// 下面是一个示例
	switch (ws.readyState) {
		case WebSocket.CONNECTING:
			// do something
			break;
		case WebSocket.OPEN:
			// do something
			break;
		case WebSocket.CLOSING:
			// do something
			break;
		case WebSocket.CLOSED:
			// do something
			break;
		default:
			// this never happens
			break;
	}

// 3、webSocket.onopen
	// 实例对象的 onopen 属性，用于指定连接成功后的回调函数。
	ws.onopen = function () {
		ws.send('Hello Server!');
	}
	// 如果要指定多个回调函数，可以使用 addEventListener 方法。
	ws.addEventListener('open', function (event) {
		ws.send('Hello Server!');
	})

// 4、webSocket.onclose
// 实例对象的 onclose 属性，用于指定连接关闭后的回调函数。
	ws.onclose = function (event) {
		var code = event.code;
		var reason = event.reason;
		var wasClean = event.wasClean;
		// handle close event
	};

	ws.addEventListener('close', function (event) {
		var code = event.code;
		var reason = event.reason;
		var wasClean = event.wasClean;
		// handle close event
	})

// 5、webSocket.onmessage
// 实例对象的 onmessage 属性，用于指定收到服务器数据后的回调函数。
	ws.onmessage = function (event) {
		var data = event.data;
		// 处理数据
	}
// 注意，服务器数据可能是文本，也可能是二进制数据 (blob 对象或 Arraybuffer 对象)。
	ws.onmessage = function (event) {
		if(typeof event.data === String) {
			console.log('Received data string');
		}

		if(typeof event.data instanceof ArrayBuffer) {
			var buffer = event.data;
			console.log('Received arraybuffer');
		}
	}
// 除了动态判断收到的数据类型，也可以使用 binaryType 属性，显式指定收到的二进制数据类型
	// 收到的是 blob 数据
	ws.binaryType = 'blob';
	ws.onmessage = function (e) {
		console.log(e.data.size);
	};

	// 收到的是 ArrayBuffer 数据
	ws.binaryType = 'arraybuffer';
	ws.onmessage = function (e) {
		console.log(e.data.byteLength);
	};

// 6、webSocket.send()
// 实例对象的 send() 方法用于向服务器发送数据
	// 发送文本
	ws.send('your message');
	// 发送 Blob 对象
	var file = document.querySelector('input[type="file"]').files[0];
	ws.send(file);
	// 发送 ArrayBuffer 对象
	var img = canvas_context.getImageData(0, 0, 400, 320);
	var binary = new Uint8Array(img.data.length);
	for(var i = 0; i < img.data.length; i++) {
		binary[i] = img.data[i];
	}
	ws.send(binary.buffer);

// 7、webSocket.bufferedAmount
	// 实例对象的 bufferdAmount 属性，表示还有多少字节的二进制数据没有发送出去。他可以用来判断发送是否结束。
	var data = new ArrayBuffer(100000000);
	socket.send(data);

	if(socket.bufferedAmount === 0) {
		// 发送完毕
	} else {
		// 发送还没结束
	}

// 8、webSocket.onerror
	// 实例对象的 onerror 属性，用于指定报错时的回调函数
	socket.onerror = function (event) {
		// handle error event
	};