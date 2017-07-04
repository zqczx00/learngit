// 定义当前屏幕与设计稿比例
let scaleW = window.innerWidth / 320;
let scaleH = window.innerHeight / 480;
// 所有需要适配尺寸的元素
var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
	// 宽度适配
    resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
    // 高度适配
    resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
    // 距离顶部偏移适配
    resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
    // 距离左侧偏移适配
    resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';
}