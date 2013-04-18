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

			case 'users':
				for(var i in data.users){
					$('#conversation #users').append('<li data-key="'+data.users[i].key+'"><img alt="'+data.users[i].name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.users[i].email)+'" />'+data.users[i].name+'</li>');
				}
				break;

			case 'login':
				if ($('#conversation #users li[data-key='+data.user.key+']').length == 0) {
					$('#conversation #users').append('<li data-key="'+data.user.key+'"><img alt="'+data.user.name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.user.email)+'" />'+data.user.name+'</li>');
				}
				$('#conversation #messages').append('<div class="login"><img alt="'+data.user.name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.user.email)+'" /><p>'+data.user.name+' logged in</p></div>');
				break;

			case 'message':
				var messageDate = new Date(data.sent);
				$('#conversation #messages').append('<div class="message"><img alt="'+data.user.name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.user.email)+'" /><p><strong>'+data.user.name+'</strong> <em>'+messageDate.getHours()+':'+messageDate.getMinutes()+'</em><br />'+data.text+'</p></div>');
				break;

			case 'logout':
				$('#conversation #users li[data-key='+data.user.key+']').remove();
				$('#conversation #messages').append('<div class="logout"><img alt="'+data.user.name+'" src="//www.gravatar.com/avatar/'+hex_md5(data.user.email)+'" /><p>'+data.user.name+' logged out</p></div>');
				break;

		}
		window.scroll(0, $('#conversation #messages').height());
	});

}