// 第一步我们要把这些校验逻辑都封装成策略对象
const stratigies = {
	isNonEmpty(value, errorMsg) {
		return value === '' ? errorMsg : void 0;
	},
	minLength(value, length, errorMsg) {
		return value.length < length ? errorMsg : void 0;
	},
	isMobile(value, errorMsg) {
		return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errorMsg : void 0;
	},
	isEmail(value, errorMsg) {
		return !/^\w+([+-.]*\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? errorMsg: void 0;
	}
}

// 抽象策略角色 - 编写 Validator 类
validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
validator.add(registerForm.userName, 'minLength:6', '用户名长度不能小于6');
// add 方法接收三个参数，第一个参数是表单字段，第二个参数是策略对象中策略方法的名字，第三个参数是验证未通过错误信息。

// 然后使用 start 方法开始验证，若验证未通过，返回验证错误信息
let errorMsg = validator.start();

// 对之前的add 方法的参数做一些改动，以数组形式传入
validator.add(registerForm.userName, [{
	strategy: 'isNonEmpty',
	errorMsg: '用户名不能为空！'
}, {
	strategy: 'minLength:6',
	errorMsg: '用户名长度不能小于6位！'
}])

// 最后是 Validator 类的实现：
class Validator {
	constructor() {
		this.cache = []; // 保存校验规则
	}

	add(dom, rules) {
		for(let rule of rules) {
			let strategyAry = rule.strategy.split(':'); // 例如 ['minLength', 6]
			let errorMsg = rule.errorMsg; // 用户名不能为空
			this.cache.push(() => {
				let strategy = strategyArr.shift(); // 用户挑选的 strategy
				strategyAry.unshift(dom.value); // 把 input 的 value 添加进参数列表
				strategyAry.push(errorMsg); // 把 errorMsg 添加进参数列表, [dom.value, 6, errorMsg]
				return strategies[strategy].apply(dom, strategyAry);
			})
		}
	}

	start() {
		for(let validatorFunc of this.cache) {
			let errorMsg = validatorFunc(); // 开始校验，并取得校验后的返回信息
			if(errorMsg) { // r 如果有确切返回值，说明校验没有通过
				return errorMsg;
			}
		}
	}
}

// 坏境角色 - 客户端调用代码
// 可以作为插件的形式，方便地被移植到其他项目中。
let registerForm = document.querySelector('#registerForm');
const validatorFunc = () => {
	let validator = new Validator();

	validator.add(registerForm.userName, [{
		strategy: 'isNonEmpty',
		errorMsg: '用户名不能为空！'
	}, {
		strategy: 'minLength:6',
		errorMsg: '用户名长度不能小于6位！'
	}])

	validator.add(registerForm.passWord, [{
		strategy: 'isNonEmpty',
		errorMsg: '密码不能为空！'
	}, {
		strategy: 'minLength:6',
		errorMsg: '密码长度不能小于6位！'
	}])

	validator.add(registerForm.phoneNumber, [{
		strategy: 'isNonEmpty',
		errorMsg: '手机号码不能为空！'
	}, {
		strategy: 'isMobile',
		errorMsg: '手机号码格式不正确！'
	}])

	validator.add(registerForm.emailAddress, [{
        strategy: 'isNonEmpty',
        errorMsg: '邮箱地址不能为空！'
    }, {
        strategy: 'isEmail',
        errorMsg: '邮箱地址格式不正确！'
    }])

    let errorMsg = validator.start();
    return errorMsg;
}

registerForm.addEventListener('submit', function() {
	let errorMsg = validatorFunc();
	if(errorMsg) {
		alert(errorMsg);
		return false;
	}
})