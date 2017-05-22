'my string'.startsWith('my'); // true
'my string'.endsWith('my'); // false
'my string'.includes('str'); // true

// 重复
'my '.repeat(3); // 'my my my ' 

// 模板字符串
let name = 'jack';
let bananas = function() {
	return 3;
}
console.log('This is ${ name } ${ bananas() }');