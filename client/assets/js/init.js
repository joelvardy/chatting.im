require.config({
	paths: {
		'zepto': 'http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min',
		'cryptography': 'https://raw.github.com/bitwiseshiftleft/sjcl/master/sjcl'
	}
});

window.chat = {};

require(['zepto', 'cryptography'], function() {

	require(['model/chat'], function(chat) {

		window.chat.model = chat;

		require(['controller/chat']);

	});

});