$(function () {

	if ( ! 'WebSocket' in window) {
		return alert('Websockets are not supported :(');
	}

	// Load classes
	window.chatting = {
		loading: new classLoading(),
		user: new classUser(),
		cryptography: new classCryptography(),
		chat: new classChat(),
		page: new classPage(),
		pages: {
			home: new pageHome(),
			chat: new pageChat()
		}
	};

	// Start the application
	chatting.loading.init();
	chatting.user.init();
	chatting.chat.init(function (connectEvent) {
		console.log('Connected', connectEvent);
		chatting.chat.login();
		chatting.loading.hide();
	}, function (disconnectEvent) {
		console.log('Disconnected', disconnectEvent);
		chatting.loading.show();
	}, function (messageEvent) {
		console.log('Message', messageEvent);
		var data = JSON.parse(messageEvent.data);
		switch (data.type) {

			case 'users':
				chatting.pages.chat.updateUserList(data);
			break;

			case 'message':
				chatting.pages.chat.addMessage(data);
			break;

		}
	});
	chatting.page.init();
	chatting.pages.home.init();
	chatting.pages.chat.init();

	// Setup routing
	page('*', function () {
		page('/');
	});
	page();

});
