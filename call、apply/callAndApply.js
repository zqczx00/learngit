function add (a, b) {
	return a + b;
}

function sub (a, b) {
	return a - b;
}

add.call(sub, 3, 1);

// 用 add 方法(方法属于对象) 来替代 sub 方法，上下文为 sub 方法的上下文

function Animal () {
	this.name = 'Animal';
	this.showName = function() {
		alert(this.name);
	}
}

function Cat () {
	this.name = 'Cat';
}

var animal = new Animal();
var cat = new Cat();

animal.showName.call(cat, ','); // 输出结果为 cat

// 实现继承
function Animal(name) {
	this.name = name;
	this.showName = function() {
		alert(this.name);
	}
}

function Cat(name) {
	Animal.call(this, name);
}

var cat = new Cat('cat'); 
cat.showName();