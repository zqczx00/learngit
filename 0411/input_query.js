var queryInput = $('input');
var queryUl = $('ul');
queryInput.on('input', function() {
	var _text = $(this).val();
	var _id = $('select[name="companyId"]').find('option:selected').attr('value');
	var _data = {
		keyword: _text,
		companyId: _id
	};
	queryUl.empty();
	$.ajax({
		url: 'url',
		data: _data,
		type: 'get',
		success: function(res) {
			var str = '';
			$.each(ret.data.users, function(index, val) {
				str += '<li data-alias = "' + val.id '"><a href="#">' + val.name + '(' + val.nickname + ')' + '</a></li>';
			})
			queryUl.append($(str));
			if(queryUl.find('li').length > 0) {
				queryUl.css({
					'display': 'block'
				})
			} else {
				queryUl.css({
					'display': 'none'
				})
			}
		}
	})
	// 隐藏
	$('*').on('click', function(event) {
		var target = event.target;
		var tc = target.localName;
		// 除了输入框和li都需要隐藏
		if(tc == 'input' || tc == 'li') return;
		queryUl.css({
			'display': 'none'
		})
	});
	// 选中
	queryUl.on('click', 'li', function() {
		queryInput.val('');
		var _text = $(this).find('a').text();
		var _id = $(this).attr('data-alias');
		queryInput.val(_text);
		queryInput.attr('data-id', _id);
		queryUl.css({
			'display': 'none'
		})
		// 执行后续操作
	})
})