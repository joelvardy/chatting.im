require.config({
	paths: {
		'zepto': 'http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min'
	}
});

window.chat = {};

require(['model/chat', 'zepto'], function(chat) {

	window.chat.model = chat;

	require(['controller/chat']);

});