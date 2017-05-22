function promise1() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log('执行任务1');
			resolve('执行任务1成功');
		}, 2000)
	})
}

function promise2() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log('执行任务2');
			resolve('执行任务2成功');
		})
	})
}

function promise3() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log('执行任务3');
			resolve('执行任务3成功');
		})
	})
}

promise1().then(function(data) {
	console.log('第一个回调: ' + data);
	return promise2();
})
.then(function(data) {
	console.log('第2个回调: ' + data);
	return promise3();
})
.then(function(data) {
	console.log('第3个回调: ' + data);
	return '还没完!该结束了吧!';
})
.then(function() {
	console.log(data);
})

// 函数式编程的基本特性
function currying () {
	var f = arguments[0];
	var args = Array.prototype.slice.call(arguments, 1);
	return function () {
		args.push.apply(args, arguments);
		return f.apply(this, args);
	}
}