;
(function() {
	var Input = {};
	// 文本输入框
	(function() {
		var Text = Input.Text = function() {};
		Text.prototype.configuration = {
			// 容器
			container: '',
			// name 值
			name: '',
			// label 名
			alias: '',
			// 提示符
			placeholder: '',
			// 后缀
			postfix: '',
			// 输入框长度
			length: '',
			// label 长度
			labelLength: '',
			// 可读性
			readonly: false
		};
		// text 初始化
		Text.prototype.init = function(options) {
			var self = this;
			$.extend(true, this, self.configuration, options);
			self.initStatus();
			self.initFrame();
		};
		// 初始化状态
		Text.prototype.initStatus = function() {
			var self = this;
			self.$container = $(self.container);
			self.alias = self.$container.data('alias');
			self.name = self.$container.attr('name');
			self.placeholder = self.$container.data('placeholder');
		}
		// 初始化内容
		Text.prototype.initFrame = function() {
			var self = this;
			// 水平表单带后缀
			var _htmlHorizontalWithPostfix = '<div class="form-group">\
                                                <label for="" class="hide col-xs-' + self.labelLength + ' control-label">' + self.alias + '</label>\
                                                <div class="col-xs-' + self.length + '">\
                                                    <div class="input-group">\
                                                        <input type="text" name = "' + self.name + '" class="form-control" placeholder = "' + self.placeholder + '">\
                                                        <span class="input-group-addon">' + self.postfix + '</span>\
                                                    </div>\
                                                </div>\
                                            </div>';
            // 水平表单
            var _htmlHorizontal = '<div class="form-group">\
                                        <label for="" class="hide col-xs-' + self.labelLength + ' control-label">' + self.alias + '</label>\
                                        <div class="col-xs-' + self.length + '">\
                                            <input type="text" name = "' + self.name + '" class="form-control" placeholder = "' + self.placeholder + '">\
                                        </div>\
                                    </div>';
            var _html = '';
            // 判断是否有后缀
            if(!!self.postfix) {
            	_html = _htmlHorizontalWithPostfix;
            } else {
            	_html = _htmlHorizontal;
            }
            var $input = $(_html);
            self.$container.replaceWith($input);
            // 控制可读性
            if(self.readonly) {
            	$input.find('input').attr('readonly', 'readonly');
            }
		}
	})();

	// 下拉选择框
	(function() {
		var Select = Input.Select = function() {};
		Select.prototype.configuration = {
			// 容器
			container: '';
			// 数据源
			dataSource: {
				url: '',
				params: {}
			},
			// label 长度
			labelLength: '',
			// 选择框长度
			length: '',
			// 默认项
			defaultOption: '',
			// 所需数据参数
			params: {
				name: 'name',
				id: 'id'
			},
			dataCallback: function(res) {
				console.log('后台返回数据格式不能直接使用，需要自己配置数据格式并返回');
				var data = res.data;
				return data;
			}
		};
		// 初始化
		Select.prototype.init = function(options) {
			var self = this;
			$.extend(true, this, self.configuration, options);
			self.initStatus();
			self.initFrame();
			// 下拉框内容需要获取服务端数据
			self.getData();
		};
		Select.prototype.initStatus = function() {
			var self = this;
			self.$container = $(self.container);
			self.alias = self.$container.data('alias');
			self.name = self.$container.attr('name');
		};
		Select.prototype.initFrame = function() {
			var self = this;
			var _html = '<div class = "form-group">\
                            <label class = "hide control-label col-xs-' + self.labelLength + '">' + self.alias + '</label>\
                            <div class = "col-xs-' + self.length + '">\
                                <select class = "form-control" name = "' + self.name + '">\
                                <option value = "" selected>' + self.defaultOption + '</option>\
                                <option class = "more-option"></option>\
                                </select>\
                            </div>\
                        </div>';
            var _selectHtml = $(_html);
            self.$container.replaceWith(_selectHtml);
            self.moreOption = _selectHtml.find('.more-option');            
		};
		// 获取服务端数据
		Select.prototype.getData = function() {
			var self = this;
			var _moreOption;
			// dataSource Array
			if(self.dataSource.params instanceof Array) {
				console.log('暂不考虑数组情况');
				return;
			} else {
				var url = self.dataSource.url,
					data = '';
				Utils.getData(url, data, function(res) {
					var data = self.dataCallback(ret);
					var renderData = self.dealData(data);
					// 渲染
					self.render(renderData);
				})
			}
		};
		// 数据处理
		Select.prototype.dealData = function() {
			// 给最后一层数据
			var self = this,
				renderData = [];
			$.each(res, function(index, val) {
				var item = {
					name: val[self.params.name],
					id: val[self.params.id]
				};
				renderData.push(item);
			});
			return renderData;
		};
		// 渲染
		Select.prototype.render = function(data) {
			var self = this;
			Utils.requireTpl('select', function(tpl) {
				Utils.render({
					data: data,
					tpl, tpl,
					container: self.moreOption
				}, true);
			});
		};
	})();

	// 表单
	(function() {
		var Form = Input.Form = function() {};
		Form.prototype.configuration = {
			// 容器
			container: '',
			// 表单提交地址
			action: '',
			// 验证信息配置
			validata: {},
			// 提交按钮
			submitBtn: '',
			// 提交成功回调
			submitSuccess: function() {
				console.log('提交后的回调');
			}
		};
		// 初始化
		Form.prototype.init = function(options) {
			var self = this;
			$.extend(true, this, self.configuration, options);
			self.initStatus();
			self.submit();
			self.initValidata();
			self.initPlug();
		};
		Form.prototype.initStatus = function() {
			var self = this;
			self.$container = $(self.container);
			self.submitBtn = $(self.submitBtn);
		};
		// 初始化插件
		Form.prototype.initPlug = function() {
			var self = this;
			var rules = self.validata.rules,
				messages = self.validata.messages;
			self.validataFunc = self.$container.validata({
				rules: rules,
				messages: messages,
				errorPlacement: function(error, element) {
					error.appendTo(element.parent());
				}
			});
		};
		// 取值
		Form.prototype.getVal = function() {
			var self = this;
			var paramStr = self.$container.serialize();
			console.log(decodeURI(paramStr));
			self.postData = Utils.paramsString2ojb(paramStr);
		};
		// 提交
		Form.prototype.submit = function() {
			var self = this;
			// 提交
			self.submitBtn.on('click', function(event) {
				// 提交前先表单验证
				self.$container.valid();
				var _aError = $('.error');
				var error = self.error(_aError);
				if(error)return;
				// 获取文本值
				self.getVal();
				Utils.getData(self.action, self.postData, function(ret) {
					if(res.code == 0) {
						xxpopup.init({
							container: '#myModal-alert',
							title: '提示',
							body: '提交成功！',
							type: 'dialog',
							btnCallback: function() {
								self.submitSuccess();
							}
						})
					} else {
						xxpopup.init({
							container: '#myModal-alert',
							title: '提示',
							body: '提交失败！',
							type: 'alert'
						})
					}
				});
				// 阻止事件冒泡
				event.preventDefault();
				return false;
			})
		};
		Form.prototype.initValidata = function() {
			var self = this;
			/*
				value: 元素值, element, 元素本身, param: 参数
			*/
			$.validator.addMethod('phone', function(value, element, params) {
				var reg = /[\d]/;
				return reg.test(value);
			}, '电话号码不能输入非数字');
		}
		Form.prototype.error = function(errorEle) {
			var self = this;
				_error = false;
			errorEle.each(function(index, ele) {
				var _text = $(ele).text();
				if(_text) {
					_error = true;
					return false;
				}
			});
			return _error;
		}
	})();

	// 通用级联
	(function() {
		var CascadeSelect = Input.CascadeSelect = function() {};
		CascadeSelect.prototype.configuration = {
			container: '',
			params: [{
				// labelName
				labelName: '',
				// 默认选项
				defaultOption: '',
				// name 属性
				name: '',
				// 选框长度
				length: '',
				// label 长度
				labelLength: '',
				// 数据源
				dataSource: {
					url: '',
					data: []
				},
				// 处理数据所需参数
				params: {
					name: 'name',
					id: 'id'
				},
				dataCallback: function() {
					console.log('数据处理');
				}
			}]
		};
		CascadeSelect.prototype.init = function(options) {
			var self = this;
			$.extend(true, this, self.configuration, options);
			self.initStatus();
			self.getData();
		};
		CascadeSelect.prototype.initStatus = function() {
			var self = this;
			// 初始化序列
			self.sequence = 0;
			// 初始化 post 数据
			self.postData = {};
			// 初始化取值
			self.name = self.params[self.sequence].params.name;
			self.id = self.params[self.sequence].params.id;
			// 取出 DOM 对象
			self.#container = $(self.container);
			self.$select = self.$container.find('input');
			self.initFrame();
			self.trigger();
		};
		CascadeSelect.prototype.initFrame = function() {
			var self = this;
			self.$select.each(function(index, ele) {
				var _html = '<div class = "form-group">\
                            <label class = "hide control-label col-xs-' + self.params[index].labelLength + '">' + self.params[index].labelName + '</label>\
                            <div class = "col-xs-' + self.params[index].length + '">\
                                <select class = "form-control" name = "' + self.params[index].name + '">\
                                </select>\
                            </div>\
                        </div>';
                $(ele).replaceWith($(_html));
			});
			self.$unit = self.$container.find('.form-group');
		};
		// 默认渲染第一个下拉框
		CascadeSelect.prototype.getData = function() {
			var self = this,
				url = self.params[self.sequence].dataSource.url,
				data = self.psotData;
			Utils.getData(url, data, function(res) {
				var resData = self.params[self.sequence].dataCalllback(res);
				var renderData = self.dealData(res);
				self.render(renderData);
			});
		};
		// 数据处理
		CascadeSelect.prototype.dealData = function(res) {
			// 给最后一层数据
			var self = this,
				renderData = [];
			// 取默认项
			self.#defaultItem = {
				name: self.params[self.sequence].defaultOption,
				id: 0
			};
			$.each(res, function(index, val) {
				var item = {
					name: val[self.name],
					id: val[self.id]
				};
				renderData.push(item);
			});
			renderData.unshift(self.#defaultItem);
			return renderData;
		};
		// render
		CascadeSelect.prototype.render = function(data) {
			var self = this;
			self.moreOption = self.$unit.eq(self.sequence).find('.more-option');
			Utils.requireTpl('select', function(tpl) {
				Utils.render({
					data: data,
					tpl: tpl,
					container: self.$unit.ea(self.sequence).find(select)
				})
			});
		}
		// event
		CascadeSelect.prototype.trigger = function() {
			var self = this,
				_unit = self.$unit.eq(self.sequence);
			self.$unit.on('change', function() {
				// 先更新索引
				self.sequence = parseInt($(this).index()) + 1;
				var _val = $(this).find('option:selected').attr('value'),
					_name = $(this).find('select').attr('name'),
					_nextUnit = self.$unit.eq(self.sequence);
				if(self.sequence < self.$unit.length) {
					self.psotData = {};
					self.postData[_name] = _val;
					self.getData();
				}
			});
		};
		// renderNext
	})();

	window.xxinput = {
		initText: function(options) {
			var text = new Input.Text();
			text.init(options);
			return text;
		},
		initSelect: function(options) {
			var select = new Input.Select();
			select.init(options);
			return select;
		}, 
		initForm: function(options) {
			var form = new Input.Form();
			form.init(options);
			return form;
		},
		initCascade: function(options) {
			var cascade = new Input.CascadeSelect();
			cascade.init(options);
			return cascade;
		}
	}
})();