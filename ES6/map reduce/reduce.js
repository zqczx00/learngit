// 1、reduce 的用法
// reduce 是一种数组运算，通常用于将数组的所有成员 "累积" 为一个值
var arr = [1, 2, 3, 4];
var sum = (a, b) => a + b;
arr.reduce(sum, 0); // 10
// 累积变量必须有一个初始值，上例是 reduce 函数的第二个参数 0，如果省略该参数，那么初始值默认是数组的第一个成员
arr.reduce(sum);

// 2、map 是 reduce 的特例
var arr = [1, 2, 3, 4];
var handler = function (newArr, x) {
	newArr.push(x + 1);
	return newArr;
};

arr.reduce(handler, []); // [2, 3, 4, 5]