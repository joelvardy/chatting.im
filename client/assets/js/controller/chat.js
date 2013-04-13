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
				$('#conversation #messages').append('<div class="login"><img src="//www.gravatar.com/avatar/'+hex_md5(data.user)+'" /><p>Logged in</p></div>');
				break;

			case 'message':
				$('#conversation #messages').append('<div class="message"><img src="//www.gravatar.com/avatar/'+hex_md5(data.user)+'" /><p>'+data.text+'</p></div>');
				break;

			case 'logout':
				$('#conversation #messages').append('<div class="logout"><img src="//www.gravatar.com/avatar/'+hex_md5(data.user)+'" /><p>Logged out</p></div>');
				break;

		}
		window.scroll(0, $('#conversation #messages').height());
	});

}