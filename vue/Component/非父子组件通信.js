// 非父子组件通信
// 有时候两个组件也需要通信（非父子关系）。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：
	var bus = new Vue();
	// 触发组件 A 中的事件
	bus.$emit('id-selected', 1);
	// 在组件 B 创建的钩子中监听事件
	bus.$on('id-selected', function (id) {
		// ...
	})