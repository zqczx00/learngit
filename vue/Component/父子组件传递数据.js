// 组件实例的作用域是孤立的，这意味着不能（也不应该）在子组件的模板引擎内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的 props 选项
Vue.componenet('child', {
	// 声明 props
	props: ['message'],
	// 就像 data 一样，prop 可以用在模板内
	// 同样也可以在 vm 实例中像 "this.message" 这样使用
	template: '<span>{{ message }}}</span>'
})

// 然后我们可以这样向它传入一个普通字符串
<child message="hello!"></child>

// 将父组件的属于动态绑定到子模板的 props 用 v-bind
<child :my-message="parentMsg"></child>

// 单向数据流
// props 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这个为了防止子组件无意修改了父组件的状态 -- 这会让应用的数据难以理解。

// 另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值，这意味着你不应该在子组件内部改变 prop.如果你这么做了，vue 会在控制台给出警告。

// 如果在子组件内要修改 prop 的值
// 1、定义一个局部变量，并用 prop 的值初始化它
	props: ['initialCounter'],
	data () {
		return {
			counter: this.initialCounter
		}
	}
// 2、定义一个计算属性，处理 prop 的值并返回
	props: ['size'],
	computed: {
		normalizedSize: function () {
			return this.size.trim().toLowerCase()
		}
	}

// 自定义事件
// 使用 v-on 绑定自定义事件
// 父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件
// 不能用 $on 侦听子组件抛出的事件，而必须在模板里直接用 v-on 绑定
	Vue.component('button-counter', {
		template: '<button v-on:click="increment">{{ counter }}</button>',
		data: function () {
			return {
				counter: 0
			}
		},
		methods: {
			increment: function () {
				this.counter += 1;
				this.$emit('increment');
			}
		}
	})

	new Vue({
		el: '#counter-event-example',
		data: {
			total: 0
		},
		methods: {
			incrementTotal: function () {
				this.total += 1;
			}
		}
	})