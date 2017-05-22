var xhr; // 声明 Xhr 变量
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
} else {
	xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

// 第一步，建立连接
xhr.open('GET', 'url', true); // 定义请求方式，请求地址，以及是否异步处理
// 设置请求头
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 监听 onreadystatechange 事件
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4 && xhr.status == 200) {
		document.getElementById('myDiv').innerHTML = xhr.responseText;
	}
}
// 将请求发送到服务器端
xhr.send();