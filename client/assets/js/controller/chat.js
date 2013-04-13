function showChat() {

	// Define actions
	var actions = {

		submitForm: function(event) {

			event.preventDefault();

			chat.chat.send($('#chat form input').val());
			$('#chat form input').val('');

		}

	}

	// Load chat view
	var chatElement = chat.template.build('chat.ejs', {}, actions);

	// Set the view
	$('#chat').empty().append(chatElement);

	// Listen for messages
	chat.chat.listen(function(data) {
		switch (data.type) {

			case 'login':
				$('#chat #messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(data.user)+'" />Logged in</p>');
				break;

			case 'message':
				$('#chat #messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(data.user)+'" />'+data.text+'</p>');
				break;

			case 'logout':
				$('#chat #messages').append('<p><img src="http://www.gravatar.com/avatar/'+hex_md5(data.user)+'" />Logged out</p>');
				break;

		}
	});

}