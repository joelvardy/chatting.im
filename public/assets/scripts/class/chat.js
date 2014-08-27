function Chat() {
	//
}

Chat.prototype = {

	init: function(connectCallback, disconnectCallback) {

		var _this = this;

		this.loggedin = false;
		this.connectionStatus = false;

		this.setConnectCallback(connectCallback);
		this.setDisconnectCallback(function(event) {
			_this.loggedin = false;
			disconnectCallback(event);
		});

		setInterval(function() {
			if ( ! _this.connectionStatus) {
				_this.connect();
			}
		}, 1500);

	},

	setConnectCallback: function(callback) {
		this.connectCallback = callback;
	},

	setMessageCallback: function(callback) {
		this.messageCallback = callback;
	},

	setDisconnectCallback: function(callback) {
		this.disconnectCallback = callback;
	},

	connect: function() {

		var _this = this;

		if ( ! 'WebSocket' in window) {
			return alert('Websockets are not supported :(');
		}

		this.connection = new WebSocket('wss://chatting.im:2428');

		this.connection.addEventListener('open', function(event) {
			_this.connectionStatus = true;
			_this.connectCallback(event);
		});

		this.connection.addEventListener('message', this.messageCallback);

		this.connection.addEventListener('close', function(event) {
			_this.connectionStatus = false;
			_this.disconnectCallback(event);
		});

		this.connection.addEventListener('error', function(event) {
			// Error
		});

	},

	push: function(data) {
		if ( ! this.connectionStatus) return alert('Not connected');
		this.connection.send(JSON.stringify(data));
	},

	isLoggedin: function() {
		return this.loggedin;
	},

	login: function() {
		if (chat.user.get('name') && chat.user.get('email')) {
			this.push({
				action : 'login',
				name : chat.user.get('name'),
				email : chat.user.get('email')
			});
			this.loggedin = true;
		}
	},

	listen: function(callback) {

		var _this = this;

		if (typeof callback === 'function') {
			_this.listenCallback = callback;
		}

		this.connection.addEventListener('message', function(event) {
			try {

				var message = JSON.parse(event.data);

				if (typeof message.user !== 'undefined') {
					message.user.name = chat.cryptography.decrypt(message.user.name);
					message.user.email = chat.cryptography.decrypt(message.user.email);
				}

				if (typeof message.users !== 'undefined') {
					for(var i in message.users){
						message.users[i].name = chat.cryptography.decrypt(message.users[i].name);
						message.users[i].email = chat.cryptography.decrypt(message.users[i].email);
					}
				}

				if (typeof message.text !== 'undefined') {
					message.text = chat.cryptography.decrypt(message.text);
				}

				_this.listenCallback(message);

			} catch(exception) {
				//
			}
		});

	},

	send: function(message) {
		this.push({
			action : 'send',
			message : chat.cryptography.encrypt(message)
		});
	}

};
