// ES6 代码 
let book = {
	title: 'X',
	sellers: ['A', 'B'],
	printSellers() {
		this.sellers.forEach(seller => console.log(seller + ' sells ' + this.title));
	}
}

// ES5 代码
var book = {
	title: 'X',
	sellers: ['A', 'B'],
	printSellers: function() {
		var that = this;
		this.sellers.forEach(function(seller) {
			console.log(sellers + ' sells ' + that.title);
		})
	}
}