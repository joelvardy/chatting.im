Zepto(function($) {

	chatModel = window.chat.model;

	// Connect to server
	chatModel.connect();

	// Login
	var name = prompt('Enter your email: (ensure gravatar is available)');
	var passphrase = prompt('Enter a passcode: (share this with whoever you are chatting to)');
	setTimeout(function () {
		chatModel.login(name, passphrase);
	}, 50);

	// Listen for messages
	chatModel.listen(function(message) {
		$('#messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(message.user)+'" />'+message.text+'</p>');
	});

	// Send message
	$('#compose').submit(function(event) {
		event.preventDefault();
		chatModel.send($('textarea', this).val());
		$('textarea', this).val('')
	});

});