function Chat() {
	//
}

Chat.prototype = {

	init: function(callback) {

		var _this = this;

		this.connection = new WebSocket('ws://chatting.im:2428', 'echo-protocol');

		this.loggedin = false;

		this.connection.onerror = function(event) {
			alert('A websocket connection error has occurred.');
		};

		this.connection.onopen = callback;

		this.connection.onclose = function(event) {

			_this.loggedin = false;
			_this.disconnectCallback();

			setTimeout(function() {
				_this.init(function() {

					// Resetup application
					_this.login();
					_this.listen();

				});
			}, 5000);

		};

	},

	isLoggedin: function() {
		return this.loggedin;
	},

	push: function(data) {
		chat.chat.connection.send(JSON.stringify(data));
	},

	listen: function(callback) {

		var _this = this;

		if (typeof callback === 'function') {
			_this.listenCallback = callback;
		}

		this.connection.addEventListener('message', function(event) {
			try {

				message = JSON.parse(event.data);

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

	login: function(name, email) {
		if (chat.user.get('name') && chat.user.get('email')) {
			this.push({
				action : 'login',
				name : chat.user.get('name'),
				email : chat.user.get('email')
			});
			this.loggedin = true;
		}
	},

	send: function(message) {
		this.push({
			action : 'send',
			message : chat.cryptography.encrypt(message)
		});
	},

	setDisconnectCallback: function(callback) {
		this.disconnectCallback = callback;
	}

};
