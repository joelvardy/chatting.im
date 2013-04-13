function showChat() {

	// Define actions
	var actions = {

		submitForm: function(event) {

			event.preventDefault();

			var message = $('#conversation form input');

			if (message.val() != '') {
				chat.chat.send(message.val());
				message.val('');
			}

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
				$('#conversation #messages').append('<p><img src="//www.gravatar.com/avatar/'+hex_md5(data.user)+'" />Logged in</p>');
				break;

			case 'message':
				$('#conversation #messages').append('<p><img src="//www.gravatar.com/avatar/'+hex_md5(data.user)+'" />'+data.text+'</p>');
				break;

			case 'logout':
				$('#conversation #messages').append('<p><img src="//www.gravatar.com/avatar/'+hex_md5(data.user)+'" />Logged out</p>');
				break;

		}
		window.scroll(0, $('#conversation #messages').height());
	});

}