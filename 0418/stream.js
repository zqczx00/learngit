/*
	stream 流
*/

var fs = require('fs');

// 打开一个流
var rs = fs.createReadStream('sample.txt', 'utf-8');

// 注意，data 事件可能会有多次，每次传递的 chunk 是流的一部分数据
rs.on('data', function(chunk) {
	console.log('DATA: ');
	console.log(chunk);
});

rs.on('end', function() {
	console.log('END');
});

rs.on('error', function(err) {
	console.log('ERROR: ' + err);
})

// 要以流的形式写入文件，只需要不断调用 write() 方法，最后以 end() 结束；
var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream 写入文本数据..\n');
ws1.write('END');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据..\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();

// 所有可以读取数据的流都继承自 stream.Readable,所有可以写入的流都继承自stream.Writable

/*
	pipe
*/
// pipe 把一个 Readable 和 Writable 流串起来后，所有的数据自动从 Readable 流进入 Writable 流。在 Node.js 中，Readable 流有一个 pipe() 方法，就是用来干这件事的。所以这实际上是一个复制文件的程序
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws);

// 默认情况下，当Readable 流的数据读取完毕，end 事件触发后，将自动关闭 Writable流，如果不希望自动关闭 Writable 流，需要传入参数：
readable.pipe(writable, { end: false });