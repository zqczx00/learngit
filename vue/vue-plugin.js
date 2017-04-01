// 如何写一个 Vue插件
/*
	1、添加全局方法或者属性，如：vue-custom-element
	2、添加全局资源：指令/过滤器/过渡等，如 vue-touch
	3、通过全局 mixin 方法添加一些组件选项，如： vuex
	4、添加 Vue 实例方法，通过把他们添加到 Vue.prototype 上实现。
	5、一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router
*/
// vue 的插件应当有一个公开方法 install 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
	MyPlugin.install = function (Vue, options) {
		// 1、添加全局方法或属性
		Vue.myGlobalMethod = function() {
			// 逻辑
		}

		// 2、添加全局资源
		Vue.directive('my-directive', {
			bind (el, binding, vnode, oldVnode) {
				// 逻辑...
			}
			...
		})

		// 3、注入组件
		Vue.mixin({
			created: function () {
				// 逻辑...
			}
			...
		})

		// 4、添加实例方法
		Vue.prototype.$myMethod = function (options) {
			// 逻辑...
		}
	}
// 通过全局方法 Vue.use() 使用插件
// 调用 MyPlugin.install(Vue)
Vue.use(MyPlugin)
// 也可以传入一个选项对象：
Vue.use(MyPlugin, { someOption: true }) 

// 在模块环境中应当始终显示调用 Vue.use()
// 通过 Browserify 或 Webpack 使用 commonJS 兼容模块
var Vue = require('vue');
var VueRouter = require('vue-router');

// 不要忘了调用次方法
Vue.use(VueRouter);