require.config({
	paths: {
		'zepto': 'http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min'
	}
});

window.chat = {};

require(['zepto', 'vendor/cryptography', 'vendor/md5'], function() {

	require(['model/chat'], function(chat) {

		window.chat.model = chat;

		require(['controller/chat']);

	});

});