var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function(err, data) {
	if(err) {
		console.log(err);
	} else {
		console.log(data);
	}
})

// Buffer 对象转换成 String
var text = bufferData.toString('utf-8');

// String 转换成 Buffer:
var buf = new Buffer(text, 'utf-8');

// 同步读取文件，和异步函数相比，多了一个 Sync 后缀，并且不接受回调函数，函数直接返回结果。
var data = fs.readFileSync('sample.txt', 'utf-8');

// 如果同步读取文件发生错误，则需要用 try...catch 捕获该错误：
try {
	var data = fs.readFileSync('sample.txt', 'utf-8');
} catch (err) {
	// 出错了
}

var fs = require('fs');

var data = 'Hello, Node.js';
// WriteFile() 的参数依次为文件名、数据和回调函数，如果传入的数据是String,默认按UTF-8编码写入文本文件，如果传入的参数是 Buffer，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个err参数
fs.writeFile('output.txt', data, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('ok.');
	}
})

// 同步写
var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);

// stat
// 如果我们要获取文件大小，创建时间等信息，可以使用 fs.stat(),它返回一个 stat 对象，能告诉我们文件或目录的详细信息：
fs.stat('sample.txt', function(err, stat) {
	if(err) {
		console.log(err);
	} else {
		// 是否是文件
		console.log('isFile: ' + stat.isFile());
		// 是否是目录
		console.log('isDirectory: ' + stat.isDirectory());
		if(stat.isFile()) {
			// 文件大小
			console.log('size: ' + stat.size);
			// 创建时间，Date 对象
			console.log('birth tiem: ' + stat.birthtime);
			// 修改时间
			console.log('modified time: ' + stat.mtime);
		}
	}
})