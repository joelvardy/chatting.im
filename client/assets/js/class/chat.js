function Chat() {
	var connection;
}

Chat.prototype = {

	init: function() {
		this.connection = new WebSocket('ws://192.168.0.34:1234', 'echo-protocol');
	},

	push: function(data) {
		this.connection.send(JSON.stringify(data));
	},

	listen: function(callback) {
		var _this = this;
		this.connection.addEventListener('message', function(event) {
			try {
				message = JSON.parse(event.data);
				message.user = chat.cryptography.decrypt(message.user);
				if (typeof message.text != 'undefined') {
					message.text = chat.cryptography.decrypt(message.text);
				}
				callback(message);
			} catch(exception) {
				//
			}
		});
	},

	login: function(user) {
		this.push({
			action : 'login',
			user : chat.cryptography.encrypt(user)
		});
	},

	send: function(message) {
		this.push({
			action : 'send',
			message : chat.cryptography.encrypt(message)
		});
	}

}