;
(function() {
	window.Utils = {};
	var viewport = $('.viewport');
	var isMock = viewport.data('mock') || 0;
	var baseurl = viewport.data('url');
	var config = require('./apiConfig.js');
	/*
		通用数据请求
	*/
	Utils.getData = function(url, data, callback, error) {
		var _url = '';
		if(isMock) {
			_url = baseurl + config.mock[url];
		} else {
			_url = baseurl + config.online[url];
		}
		var encodeUrl = encodeURI(_url);
		// 传入的 data 是对象，序列化之并编码
		$.ajax({
			type: 'POST',
			data: data,
			url: encodeUrl,
			dataType: 'json',
			beforeSend: function(xhr) {
				xhr.withCredentials = true;
			},
			crossDomain: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(rep) {
				if(!rep) {
					return;
				}
				try {
					$.siPlainObject(rep)
				} catch (e) {
					console.log('数据解析错误');
					if(typeof error === 'function') {
						error.apply(this, arguments);
					} else {
						alert('数据解析错误');
					}
				}
				callback.apply(this, arguments);
			},
			error: function(rep) {
				if(typeof error === 'function') {
					error.apply(this, arguments);
				} else {
					alert('请求失败，请稍后再试或联系管理员');
				}
			}
		})
	};
	/*
		通用数据请求 post
	*/
	Utils.postData = function(url, data, callback, error) {
		var _url = '';
		if(isMock) {
			_url = baseurl + config.mock[url];
		} else {
			_url = baseurl + config.online[url];
		}
		var encodeUrl = encodeURI(_url);
		// 传入的 data 是对象，序列化之并编码
		// if(typeof data === 'object') {
		// 	data = $.param(data);
		// }
		// data = encodeURI(data);
		$.post({
			type: 'POST',
			data: data,
			url: encodeUrl,
			dataType: 'json',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(rep) {
				if(!rep) {
					console.log('空值');
					return;
				}
				try {
					$.isPlainObject(rep);
				} catch (e) {
					console.log('数据解析错误');
					if(typeof error === 'function') {
						error.apply(this, arguments);
					} else {
						alert('数据解析错误');
					}
				}
				callback.apply(this, arguments);
			},
			error: function(rep) {
				if(typeof error === 'function') {
					error.apply(this, arguments)
				} else {
					alert('请求失败，请稍后再试或联系管理员');
				}
			}
		})
	};
	/*
		获取模板
	*/
	Utils.requireTpl = function(tpl, cb) {
		var url = '../tpl' + tpl + '.html';
		$.ajax({
			type: 'GET',
			url: url,
			data: '',
			dataType: 'text',
			success: function(rep) {
				console.log('已取得模板');
				return cb(doT.template(rep));
			}
		})
	};
	/*
		模板渲染
	*/
	Utils.render = function(cfg, replace) {
		var _data = cfg.data;
		var _tplStr = cfg.tpl;
		var _container = cfg.container;
		var _tpl;
		_container.empty();
		tpl = _tplStr(_data);
		Utils.appendHtml(_tpl, _container, replace);
	};
	/*
		添加文档节点
	*/
	Utils.appendHtml = function(str, container, replace) {
		if(replace) {
			container.replaceWith(str);
			return;
		}
		container.append(str);
	};
	/*
		获取浏览器查询参数
	*/
	Utils.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	/*
		获取 input 输入值
	*/
	Utils.getInput = function(container, index) {
		var val = $(container).find('input').eq(index).val();
		return val;
	};
	/*
		数组判断
	*/
	Utils.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};
	/*
		判断对象
	*/
	Utils.isObject = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	};
	/*
		将序列化字符串转化为对象
	*/
	Utils.paramsString2obj = function(serializedParams) {
		var obj = {};
		function evalThem(str) {
			var strArr = [];
			strArr = str.split('=');
			// 使用 decodeURICompenent 解析 uri 组件编码
			for(var i = 0; i < strArr.length; i++) {
				strArr[i] = decodeURICompenent(strArr[i]);
			}
			var attributeName = strArr[0];
			var attributeValue = strArr[1].trim();
			// 如果值中包含 "=" 符号，需要合并值
			if(strArr.length > 2) {
				for(var i = 2; i < strArr.length; i++) {
					attributeValue += '=' + strArr[i].trim();
				}
			}
			if(!attributeValue) {
				return;
			}
			var attriNames = attributeName.split('.');
			var curObj = obj;
			for(var i = 0; i < (attriNames.length - 1); i++) {
				curObj[attriNames[i]] ? "" : (curObj[attriNames[i]] = {});
				curObj = curObj[attriNames[i]];
			}
			// 使用赋值方式 obj[attributeName] = attributeValue.trim(); 替换
			// eval('obj.'+ attributeName +'=\''+attributeValue.trim() + '\;');
			// 解决值attributeValue 中包含单引号、双引号时无法处理的问题
			// 这里可能存在一种情况：多个 checkbox 同一个 name 的时候需要使用','来分割
			// curObj[attriNames[i]] = curObj[attriNames[i]] ? (curObj[attriNames[i]] + ',' + attributeValue.trim()) : attributeValue.trim();

			if(curObj[attriNames[i]]) {
				if(Utils.isArray(curObj[attriNames[i]])) {
					curObj[attrinames[i]].push(attributeValue.trim());
				} else {
					curObj[attriNames[i]] = curObj[attriNames[i]].split(',');
					curObj[attriNames[i]].push(attributeValue.trim());
				}
			} else {
				curObj[attriNames[i]] = attributeValue.trim();
			}
		};
		var properties = serializedParams.split('&');
		for(var i = 0; i < properties.length; i++) {
			evalThem(propertied[i]);
		}
		return obj;
	};

});