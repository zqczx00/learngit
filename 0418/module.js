/*
	node 实现 JavaScript 模块的一个简单的原理介绍
*/

var module = {
	id: 'hello',
	exports: {}
};

var load = function(module) {
	// 读取的 hello.js 代码：
	function greet(name) {
		console.log('Hello, ' + name + '!');
	} 

	module.exports = greet;
	// hello.js 代码结束
	return module.exports;
};

var exported = load(module);
// 保存 module
save(module, exported);