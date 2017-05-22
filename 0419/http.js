// 引入 http 模块
var http = require('http');

// 创建 http server ，并传入回调函数
var server = http.createServer(function(request, response) {
	// 回调函数接收 request 和 response 对象
	// 获得 HTTP 请求的 method 和 url
	console.log(request.method + ': ' + request.url);
	// 讲 HTTP 响应 200 写入 response,同时设置 Content-Type: text/html
	response.writeHead(200, { 'Content-Type': 'text/html' });
	// 讲 HTTP 响应的 HTML内容写入 response
	response.end('<h1>Hello World!</h1>');
});

// 让服务器监听 8080 端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');