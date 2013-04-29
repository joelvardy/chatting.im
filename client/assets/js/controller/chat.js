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

	// Set unread message count
	var unreadMessages = 0;

	chat.page.setVisibilityChangeCallback(function() {
		if (chat.page.isActive()) {
			unreadMessages = 0;
			document.title = 'Chatting';
		}
	});

	// Listen for messages
	chat.chat.listen(function(data) {
		switch (data.type) {

			case 'users':
				for(var i in data.users){
					$('#conversation #users').append('<li data-key="'+data.users[i].key+'"><img alt="'+data.users[i].name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.users[i].email)+'" />'+data.users[i].name+'</li>');
				}
				break;

			case 'login':
				if ($('#conversation #users li[data-key='+data.user.key+']').length == 0) {
					$('#conversation #users').append('<li data-key="'+data.user.key+'"><img alt="'+data.user.name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.user.email)+'" />'+data.user.name+'</li>');
				}
				break;

			case 'message':
				var messageDate = new Date(data.sent);
				data.sent = (messageDate.getHours() < 10 ? '0' : '')+messageDate.getHours()+':'+(messageDate.getMinutes() < 10 ? '0' : '')+messageDate.getMinutes();
				$('#conversation #messages').append(chat.template.build('chat-message.ejs', data));
				if ( ! chat.page.isActive()) {
					unreadMessages++;
					if (unreadMessages == 1) {
						var notification = new Audio('/assets/audio/notification.wav');
						notification.play();
					}
					document.title = '('+unreadMessages+') Chatting';
				}
				break;

			case 'logout':
				$('#conversation #users li[data-key='+data.user.key+']').remove();
				break;

		}
		window.scroll(0, $('#conversation #messages').height());
	});

}