export default {
	data () {
		return {
			message: 'hello'
		}
	},
	created () {
		this.message = 'bye!'
	}
}

// 当测试的组件时，所要做的就是导入对象和 Vue 然后使用许多常见的断言
// 导入 Vue.js 和组件，进行测试
import Vue from 'vue';
import MyComponent from 'path/to/MyComponent.vue';

// 这里是一些 Jasmine 2.0 的测试，你也可以使用你喜欢的任何断言库或者测试工具
describe('MyComponent', () => {
	// 检查原始组件选项
	it('has a created hook', () => {
		expect (typeof MyComponent.created).toBe('function')
	})

	// 评估原始组件选项中的函数的结果
	it('sets this correct default data', () => {
		expect(typeof MyComponent.data).toBe('function');
		const defaultData = MyComponent.data();
		expect(defaultData.message).toBe('hello');
	})

	// 检查 mount 中的组件实例
	it('correctly sets the message when created', () => {
		const vm = new Vue(MyComponent).$mount();
		expect(vm.message).toBe('bye');
	})

	// 创建一个实例并检查渲染输出
	it('correctly sets the message when created', () => {
		const Ctor = Vue.extend(MyComponent);
		const vm = new Ctor().$mount();
		expect(vm.$el.textContent).toBe('bye!');
	})
})

// 可以在不同的 props 中，通过 propsData 选项断言它的渲染输出
// 挂载元素并返回已渲染的文本的工具函数
function getRenderedText (Component, propsData) {
	const Ctor = Vue.extend(Component);
	const vm = new Ctor({ propsData })
}