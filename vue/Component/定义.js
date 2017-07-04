// 组件 (Component) 是 vue 最强大的功能之一，组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件时自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。

// 注册
new Vue({
	el: '#some-element',
	// 选项
})

// 注册一个全局组件，可以使用 Vue.component(tagName, options)
Vue.component('my-component', {
	// 选项
})

// 组件在注册之后，便可以在父实例的模块中以自定义元素 <my-component></my-component> 的形式使用，要确保在初始化根实例之前注册了组件:
<div id="example">
	<my-component></my-component>
</div>

// 注册
Vue.component('my-component', {
	template: '<div>A custom component</div>'
})

// 创建实例
new Vue({
	el: '#example'
})

// 渲染为：
<div id="example">
	<div>A custom component!</div>
</div>

// 当自定义组件被认为是无效的内容时，变通的方案是使用特殊的 is 属性
<table>
	<tr is="my-row"></tr>
</table>