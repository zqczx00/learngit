// 转换
function getBase64Image (img) {
	var canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.heihgt = img.height;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);
	var dataURL = canvas.toDataURL('image/png');
	return dataURL;
}

function main () {
	var img = document.createElement('img');
	img.src = './images/test.png';
	img.onload = function () {
		var data = getBase64Image(img);
		console.log(data);
	}
	document.body.appendChild(img);
}

main();