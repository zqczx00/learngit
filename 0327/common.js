$(function() {
	var xxmain = {
		init: function() {
			var self = this;
			self.logout();
		},
		// 菜单状态
		menu: function(index, subIndex) {
			var self = this;
			var $nav = $('.left-side-inner').find('.nav');
			console.log($nav.find('> li.menu-list').length);
			$nav.find('> li.menu-list').eq(index).addClass('nav-active nav-hover').find('.sub-menu-list > li').eq(subIndex).css({ 'background': '#2a323f'});
		},
		// 获取用户信息
		getUserInfo: function(callback, arr, cb) {
			var self = this;
			console.log((new Date()).getTime() + '获取用户信息');
			Utils.getData('getUserInfo', null, function(userInfo) {
				if(userInfo.code == 0) {
					self.userInfo = userInfo;
					if(arr) {
						callback && callback(userInfo, arr, cb);
					} else {
						callback && callback.apply(this, arguments);
					}
					console.log((new Date()).getTime() + '获取用户信息结束');
				} else {
					window.location.href = '/pages/login/login.html';
				}
			})
		},
		// 注销登录
		logout: function() {
			var self = this;
			$('.fa-sign-out').parent('a').on('click', function() {
				self.getUserInfo(self.logoutHandle);
			});
		},
		logoutHandler: function(userInfo) {
			var self = this;
			if(userInfo.data.role === 'organization') {
				Utils.getData('loginAuthOut', null, function(res) {
					if(res.code == 0) {
						window.location.href = '/pages/login/login.html';
					} else {
						alert('退出失败！');
					}
				});
			} else {
				Utils.getData('loginCustomerOut', null, function(res) {
					if(res.code == 0) {
						window.location.href = '/pages/login/loginCustomer.html';
					} else {
						alert('退出失败！');
					}
				});
			}
		},
		// judgment Authority
		judgment: function(userInfo, arr, cb) {
			var self = this;
			var key = arr.join('-');
			var result = false;
			console.log((new Date()).getTime() + '开始循环判断权限');
			$.each(userInfo.data.duties, function(index, val) {
				if(val.name === key) {
					result = true;
					return false;
				}
			});
			cb(result);
		},
		// initJudge
		initJudgement
	}
});