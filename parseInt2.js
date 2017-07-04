// 学习笔记：不使用 JavaScript 内置的 parseInt() 和 Number() 函数，利用 map 和 reduce 操作实现一个 string2int() 函数

// 分析：把一个字符串 "13579" 先变成 Array --- [1, 3, 5, 7, 9],再利用 reduce() 就可以写出一个把字符串转换成 Number 的hanshu7

'use strict';

function string2int (s) {
	function str2num (str) {
		var strArr = str.split(''); // 把字符串分割成字符串数组
		// 通过 js 的弱类型转换，实现字符串类型到数组类型的转换
		function toInt (data) {
			return +data; 
		}
		// 通过 map() 把字符串数组转换成数字数组
		var numArr = strArr.map(toInt); 
		// 返回
		return numArr;
	}

	var num = str2num(s);
	// 通过 reduce( 把数字数组转换成数字量)
	var res = num.reduce(function (x, y) {
		return x * 10 + y;
	});

	return res;
}

// 测试：
if (string2int('12345') === 12345 && string2int('12300') === 12300) {
	if (string2int.toString().indexOf('parseInt') !== -1) {
		alert('请勿使用parseInt()');
	} else if (string2int.toString().indexOf('Number') !== -1) {
		alert('请勿使用Number()');
	} else {
		alert('测试通过');
	}
} else {
	alert('测试失败');
}