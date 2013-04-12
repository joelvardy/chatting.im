Zepto(function($) {

	chatModel = window.chat.model;

	// Connect to server
	chatModel.connect();

	// Login
	var email = prompt('Enter your email: (ensure gravatar is available)');
	var passphrase = prompt('Enter a passcode: (share this with whoever you are chatting to)');
	setTimeout(function () {
		chatModel.login(email, passphrase);
	}, 50);

	// Listen for messages
	chatModel.listen(function(data) {
		console.log(data);
		switch (data.type) {

			case 'login':
				$('#messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(data.user)+'" />Logged in</p>');
				break;

			case 'message':
				$('#messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(data.user)+'" />'+data.text+'</p>');
				break;

			case 'logout':
				$('#messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(data.user)+'" />Logged out</p>');
				break;

		}
	});

	// Send message
	$('#compose').submit(function(event) {
		event.preventDefault();
		chatModel.send($('textarea', this).val());
		$('textarea', this).val('')
	});

});