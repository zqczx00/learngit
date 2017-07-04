
// 在 for 循环内部创建一个立即执行函数，将 k 传入，这个时候 getXXX 函数共享的就是各个匿名函数的 k 了
var User = function (opts) {
	var scope = this;
	for (var k in opts) {
		scope['get' + k] = function () {
			return opts[k];
		};
		scope['set' + k] = function (v) {
			return opts[k] = v;
		}
	}
}

var u = new User({
	name: '测试',
	age: 11
})

console.log(u.getname());

// 生成唯一 ID 也是闭包一个经典的使用方式
function getUUID () {
	var id = 0;
	return function () {
		return ++id;
	}
}

var uuid = getUUID();

// 这段代码骑士非常有意义，我们在浏览器中不停的执行 uuid() 确实会得到不同的值，但是如果我们只使用 getUUID()() 的话每次值仍然一样
uuid(); // 1
uuid(); // 2
uuid(); // 3
getUUID(); // 1
getUUID(); // 1
// 导致这个问题的原因是，我们将 getUUID 执行后的结果赋予 uuid，这个时候 uuid 就保存对其中匿名函数的引用，而匿名函数保存着 getUUID 的活动对象，所以 id 一直未销毁而直接调用的话，就会重新生成活动对象。

// 利用闭包实现一个事件委托
var arr = [];
var slice = arr.slice;
var extend = function (src, obj) {
	var o = {};
	for (var k in src) {
		o[k] = src[k];
	}
	for (var k in obj) {
		o[k] = obj[k];
	}
	return o;
};

function delegate (selector, type, fn) {
	var callback = fn;

	var handler = function (e) {
		// 选择器找到的元素
		var selectorEl = document.querySelector(selector);
		// 当前点击元素
		var el = e.target;
		// 确定选择器找到的元素是否包含当前点击元素，如果包含就应该触发事件
		// 注意，此处只是简单实现，实际应用应会有许多判断
		if (selectorEl.contains(el)) {
			var evt = extend(e, { currentTarget: selectorEl });
			evt = [evt].concat(slice.call(arguments, 1));
			callback.apply(selectorEl, evt);
			var s = '';
		}
		var s = '';
	};

	document.addEventListener(type, handler, false);
}

// 于是我们就可以展开调用了。