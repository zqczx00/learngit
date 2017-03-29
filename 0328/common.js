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
			var key = arr;
			var result = [];
			// console.log((new Date()).getTime() + '开始循环判断权限');
			$.each(userInfo.data.duties, function(index, val) {
				var _arrName = val.name.split('-');
				if(_arrName.indexOf(key[0]) > -1 && _arrName.indexOf(key[1]) > -1) {
					result.push(_arrName[2]);
				} else {
					return true;
				}
			});
			cb(result);
		},
		// initJudge
		initJudgement: function(arr, cb) {
			var self = this;
			self.getUserInfo(self.judgment, arr, cb);
		},
		// judge button
		buttonJudge: function(el, data) {
			var self = this;
			var vm = new Vue({
				el: el,
				data: data,
				computed: {
					create: function() {
						var res = false;
						if(data.indexOf('crete') > -1) {
							res = true;
						}
						return res;
					},
					delete: function() {
						var res = false;
						if(data.indexOf('delete') > -1) {
							res = true;
						}
						return res;
					},
					retrieve: function() {
						var res = false;
						if(data.indexOf('retrieve') > -1) {
							res = true;
						}
						return res;
					},
					update: function() {
						var res = false;
						if(data.indexOf('update') > -1) {
							res = true;
						}
						return res;
					}
				}
			})
		},
		// menu data
		creteMenuData: function(userInfo) {
			var self = this;
			var rawData = userInfo.data.dutied;
			var menu = [];
			var subMenu = [];
			$.each(rawData, function(index, val) {
				var _nameArr = val.name.split('-');
				if(_arrName[2] !== 'retrieve') {
					return true;
				} else {
					if(menu.indexOf(_nameArr[0]) < 0) {
						menu.push(_nameArr[0]);
					}
					subMenu.push(val.name);
				}
			});
			xxmain.renderMenu({
				menu: menu,
				subMenu: subMenu
			});
		},
		// create menu
		createMenu: function() {
			var self = this;
			self.getUserInfo(self.createMenuData);
		},
		renderMenu: function(data) {
			var self = this;
			var vm1 = new Vue({
				el: '#renderMenu',
				data: {
					message: data
				},
				computed: {
					business: function() {
						var data = {};
						if(this.message.menu.indexOf('business') > -1) {
							data.menu = true;
						}
						$.each(this.message.subMenu, function(index, val) {
                            switch (val) {
                                case 'organization-company-retrieve':
                                    data.company = true;
                                    break;
                                case 'organization-department-retrieve':
                                    data.department = true;
                                    break;
                                case 'organization-user-retrieve':
                                    data.user = true;
                                    break;
                                case 'organization-post-retrieve':
                                    data.post = true;
                                    break;
                                default:
                                    return;
                            }
						});
						return data;
					},
					customer: function() {
						var data = {};
						if(this.message.menu.indexOf('customer') > -1) {
							data.menu = true;
						}
                        $.each(this.message.subMenu, function(index, val) {
                            switch (val) {
                                case 'customer-company-retrieve':
                                    data.company = true;
                                    break;
                                case 'customer-department-retrieve':
                                    data.department = true;
                                    break;
                                case 'customer-user-retrieve':
                                    data.user = true;
                                    break;
                                case 'customer-post-retrieve':
                                    data.post = true;
                                    break;
                                default:
                                    return;
                            }
                        });
                        return data;
					},
					organization: function() {
						var data = {};
                        if (this.message.menu.indexOf('organization') > -1) {
                            data.menu = true;
                        };
                        $.each(this.message.subMenu, function(index, val) {
                            switch (val) {
                                case 'organization-company-retrieve':
                                    data.company = true;
                                    break;
                                case 'organization-department-retrieve':
                                    data.department = true;
                                    break;
                                case 'organization-user-retrieve':
                                    data.user = true;
                                    break;
                                case 'organization-post-retrieve':
                                    data.post = true;
                                    break;
                                default:
                                    return;
                            }
                        });
                        return data;
					}
				}
			});
			self.menuToggle();
		},
		// 切换菜单
		menuToggle: function() {
			jQuery('#renderMenu').on('click', '.menu-list > a', function() {
				var parent = jQuery(this).parent();
				var sub = parent.find('> ul');

				if(!jQuery('body').hasClass('left-side-collapsed')) {
					if(sub.is(':visible')) {
						sub.slideUp(200, function() {
							parent.removeClass('nav-active');
							jQuery('.main-content').css({ height: '' });
							mainContentHeightAdjust();
						});
					} else {
						visibleSubMenuClose();
						parent.addClass('nav-active');
						sub.slideDown(200, function() {
							mainContentHeightAdjust();
						});
					}
				}
				return false;
			});

			function visibleSubMenuClose() {
				jQuery('.menu-list').each(function() {
					var _this = jQuery(this);
					if(_this.hasClass('nav-active')) {
						_this.find('> ul').slideUp(200, function() {
							_this.removeClass('nav-active');
						})
					}
				})
			}

			function mainContentHeightAdjust() {
				// Adjust main content height
				var docHeight = jQuery(document).height();
				if(docHeight > jQuery('.main-content').height()) {
					jQuery('.main-content').height(docHeight);
				}
			}
		}
	}
	window.xxmain = xxmain;
});