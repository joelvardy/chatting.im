function pageChat () {
	//
}

pageChat.prototype = {

	init: function () {

		page('/:roomKey', function (path) {

			chatting.user.set('roomKey', path.params.roomKey);

			chatting.page.load('chat', {
				//
			}, [{
				selector: 'form.message',
				event: 'submit',
				handler: function (event) {
					event.preventDefault();
					var message = $('input', event.target);
					if (message.val() === '') return;
					chatting.chat.send(message.val());
					message.val('');
				}
			}]);

			chatting.chat.login();

			if ( ! chatting.chat.loggedIn) {
				return page.redirect('/'+path.params.roomKey+'/login');
			}

		});

		page('/:roomKey/login', function (path) {

			chatting.page.load('login', {
				//
			}, [{
				selector: 'form.login',
				event: 'submit',
				handler: function (event) {

					event.preventDefault();
					chatting.user.set('name', $('input', event.target).val());
					page.redirect('/'+path.params.roomKey);

				}
			}]);

		});

	},

	updateUserList: function (data) {

		if ( ! $('#chat[template=chat] ul.users').length) return;

		$('#chat[template=chat] ul.users').empty();
		for (var i in data.users) {
			try {
				var name = chatting.cryptography.decrypt(data.users[i].name);
				$('#chat[template=chat] ul.users').append('<li>'+name+'</li>');
			} catch (e) {
				//
			}
		}

	},

	addMessage: function (data) {

		if ( ! $('#chat[template=chat] div.messages').length) return;

		try {

			var message = chatting.cryptography.decrypt(data.text),
				userName = chatting.cryptography.decrypt(data.user.name);

			$.get('/assets/templates/chat.message.mustache', function (template) {

				var messageElement = $('#chat[template=chat] div.messages').append(Mustache.render($(template).filter('#template').html(), {
					sent: {
						raw: data.sent,
						pretty: moment(data.sent).fromNow()
					},
					message: message,
					user: {
						reference: data.user.reference,
						name: userName
					}
				}));

				// Scroll messages window to the bottom
				$('#chat[template=chat] div.messages').scrollTop(99999);

				// Keep messae time up to date
				setInterval(function () {
					$('span.date', data.sent).html(moment($('span.date', data.sent).attr('title')).fromNow());
				}, 5000);

				if ( ! chatting.page.isVisible) {
					chatting.page.setTitle('NEW MESSAGES 📨');
					chatting.page.notification();
				}

			});

		} catch (e) {
			//
		}

	}

};
