/*
	文件上传
*/
(function() {
	var Upload = function() {};
	Upload.prototype.configuration = {
		container: '',
		// 是否支持多文件上传
		multiple: true,
		// Number 上传大小限制(暂时以 M 为单位)
		maxSize: '',
		// 上传按钮( 仅上传文件，不和其他数据一起提交 )
		uploadBtn: '',
		// 表单提交( 包括其他的数据 )
		formBtn: '',
		// name 
		name: '',
		// 地址
		url: '',
		// 编辑时用 id name url 为对应字段别名 params 为删除所需参数
		editFile: {
			id: 'id',
			name: 'name',
			url: 'url',
			file: [],
			deleteUrl: '',
			params: {
				id: 'id'
			}
		},
		// 文件格式 'png', 'jpq', 'gif', 'bmp', 'tiff', 'svg'
		format: ['png', 'jpq', 'gif', 'bmp', 'tiff', 'svg'],
		// 成功回调
		success: function() {},
		// 失败回调
		error: function() {}
	};
	// 初始化
	Upload.prototype.init = function(options) {
		var self = this;
		$.extend(true, this, self.configuration, options);
		self.initStatus();
		self.initFrame();
		self.submit_upload();
	}
	// 初始化状态
	Upload.prototype.initStatus = function() {
		var self = this;
		self.$container = $(self.container);
		self.$uploadBtn = $(self.uploadBtn);
	}
	// 初始化页面
	Upload.prototype.initFrame = function() {
		var self = this;
		var str = '<div class="upload>\
						<div class="file-list">\
						</div>\
						<div class="btns">\
							<div class="file-picker">\
								<div class="pick btn btn-info">选择文件</div>\
								<div class="file-input">\
									<input id="uploadfile" type="file" multiple=true>\
								</div>\
							</div>\
						</div>\
					</div>';
		var _html = $(str);
		self.$input = _html.find('input');
		self.$fileList = _html.find('file-list');
		self.$container.replaceWith(_html);
		self.trigger();
	},
	// 触发
	Upload.prototype.trigger = function() {
		var self = this;
		self.cache = [];
		var _l = self.editFile.file.length;
		if(_l > 0) {
			$.each(self.editFile.file, function(index, val) {
				var _name = val[self.editFile.name];
				var _url = val[self.editFile.url];
				var _postfix = _url.split('.').pop();
				var _type = self.formatType(_postfix, self.format);
				self.addList(_type, _name, _url, true, { id: val.id });
				self.cache.push(val);
			})
		}
		self.$input.on('change', function() {
			var _file = this.files[0];
			if(!_file) return;
			self.cache.push(_file);
			self.getFile = self.cache;
			var _name = _file.name;
			var _size = _file.size;
			if(self.maxSize) {
				if(_size > parseInt(self.maxSize, 10) * 1024 * 1024) {
					alert('文件大小超出限制，请上传' + self.maxSize + 'M以内的文件');
				}
			}
			var _postfix = _name.split('.').pop();
			var _format = self.format;
			var _type;
			if(self.format.indexOf(_postfix) < 0) {
				alert('请上传' + self.format.join() + '类型的文件');
				return;
			}
			_type = self.formatType(_postfix, _format);
			var url = self.setSrc(_file);
			self.addList(_type, _name, url);
		})
	}
	// 添加上传文件
	Upload.prototype.addList = function(type, name, url, isEdit, params) {
		var self = this;
		var _item = type === 'img' ? '<img src = "' + url + '" class="list-item">' : '<span class = "item"></span>';
		var _isEdit = isEdit ? 'isEdit' : '';
		if(params) var id = params.id;
		var str = '<div class="list ' + _isEdit + '" data-alias = "' + id + '">\
						<div class="img-info">\
							<span class="img-name">png</span>\
							<span class="img-delete hide"><i>X</i></span>\
							<span class="complete"></span>\
						</div>' + _item + '\
					</div>';
		var _html = $(str);
		var _name = _html.find('.img-name');
		var _delete = _html.find('.img-delete');
		_name.text(name);
		self.$fileList.append(_html);
		self.handle(_html, _delete);
	}
	// 判断文件类型
	Upload.prototype.formatType = function(postfix, _format) {
		var self = this;
		var _type;
		if(_format.indexOf(postfix) > -1) {
			_type = 'img';
		} else {
			_type = 'other';
		}
		return _type;
	}
	// 设置地址
	Upload.prototype.setSrc = function(file) {
		var self = this;
		var url = null;
		if(window.createObjectURL != undefined) {
			url = window.URL.createObjectURL(file);
		} else if (window.URL != undefined) {
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) {
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	// 事件处理
	Upload.prototype.handle = function(el, _delete) {
		var self = this;
		el.on('mouseover', function() {
			_delete.removeClass('hide');
		})
		el.on('mouseout', function() {
			_delete.addClass('hide');
		})
		var _deleteEl = _delete.find('i');
		_deleteEl.on('click', function() {
			var _list = $(this).parents('.list');
			if(_list.hasClass('isEdit')) {
				var data = {};
				for(var i in self.editFile.params) {
					data[i] = self.editFile.params[i];
				}
				Utils.getData(self.editFile.deleteUrl, data, function(res) {
					self._index = _list.index();
					self.cache.splice(self._index, 1);
				})
			} else {
				self._index = _list.index();
				self.cache.splice(self._index, 1);
			}
			_list.remove();
			self.getFile = self.cache;
		})
	}
	window.xxupload = {
		init: function(options) {
			var upload = new Upload();
			upload.init(options);
			return upload;
		}
	}
})();