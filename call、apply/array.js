let itemElements = document.querySelectorAll('.items');
let items = Array.from(itemElements);
items.forEach(function(element) {
	console.log(element.nodeType);
})

// A workaround often used in ES5
let items = Array.prototype.slice.call(itemElements);