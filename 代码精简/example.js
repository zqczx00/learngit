// 1、让 function 成为代码组合的最小单元

// 2、删除不必要的代码
const add2 = a => b => a + b;
const inc = add2(1); 
inc(3); // 4

// 当两个函数组合时，无需创建一个变量来保存两个函数运行时的中间值。我们来看看函数组合是怎么减少代码的。
const g = n => n + 1;
const f = n => n * 2;
// 需要操作参数、并且存储中间结果
const incThenDoublePoints = n => {
	const incremented = g(n);
	return f(incremented);
};
incThenDoublePoints(20); // 42

// 可以利用函子 ( functor ) 来做同样的事情。在函子中把参数封装成可遍历的数组。让我们利用函子来写另一个版本的 compose2
const compose2 = (f, g) => x => [x].map(g).map(f).pop();
const incThenDoublePointFree = compose2(f, g);
incThenDoublePointFree(20); // 42

// 几乎每个函数式变成类库都提供至少两种函数组合方法：从右到左一次运行的 compose();
// 从左到右一次运行的 pipe()

// 3,、使用主动语态
// isActive(user) 优于 getActiveStatus(user)
// isFirstRun = false; 优于 firstRun = false;