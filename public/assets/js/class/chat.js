function classChat () {
	//
}

classChat.prototype = {

	init: function (connectCallback, disconnectCallback, messageCallback) {

		var _this = this;

		this.loggedIn = false;
		this.connectionStatus = false;

		this.setConnectCallback(connectCallback);
		this.setDisconnectCallback(function (event) {
			_this.loggedIn = false;
			chatting.loading.show();
			disconnectCallback(event);
		});
		this.setMessageCallback(messageCallback);

		// Connect to server
		this.connect();

		// Reconnect to server
		setInterval(function () {
			if ( ! _this.connectionStatus) {
				_this.connect();
			}
		}, 1500);

	},

	setConnectCallback: function (callback) {
		this.connectCallback = callback;
	},

	setMessageCallback: function (callback) {
		this.messageCallback = callback;
	},

	setDisconnectCallback: function (callback) {
		this.disconnectCallback = callback;
	},

	connect: function () {

		var _this = this;

		this.connection = new WebSocket('wss://chatting.im:2428');

		this.connection.addEventListener('open', function (event) {

			_this.connectionStatus = true;

			_this.connection.addEventListener('message', _this.messageCallback);

			_this.connection.addEventListener('close', function (event) {
				_this.connectionStatus = false;
				_this.disconnectCallback(event);
			});

			_this.connectCallback(event);

		});

	},

	login: function () {
		if (chatting.user.get('name') && chatting.user.get('roomKey')) {
			this.push({
				action: 'login',
				name: chatting.cryptography.encrypt(chatting.user.get('name'))
			});
			this.loggedIn = true;
		}
	},

	push: function (data) {
		if ( ! this.connectionStatus) return false;
		this.connection.send(JSON.stringify(data));
	},

	send: function (message) {
		return this.push({
			action: 'message',
			message: chatting.cryptography.encrypt(message)
		});
	}

};
