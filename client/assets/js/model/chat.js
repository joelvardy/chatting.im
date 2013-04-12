define(function() {

	function Chat() {
		var	connection,
			encryptionKey;
	}

	Chat.prototype = {

		connect: function() {
			this.connection = new WebSocket('ws://192.168.0.33:1234', 'echo-protocol');
		},

		push: function(data) {
			this.connection.send(JSON.stringify(data));
		},

		listen: function(callback) {
			var _this = this;
			this.connection.addEventListener('message', function(event) {
				try {
					message = JSON.parse(event.data);
					message.user = sjcl.decrypt(_this.encryptionKey, message.user);
					if (typeof message.text != 'undefined') {
						message.text = sjcl.decrypt(_this.encryptionKey, message.text);
					}
					callback(message);
				} catch(exception) {
					//
				}
			});
		},

		login: function(user, encryptionKey) {
			this.encryptionKey = encryptionKey;
			this.push({
				action : 'login',
				user : sjcl.encrypt(this.encryptionKey, user)
			});
		},

		send: function(message) {
			this.push({
				action : 'send',
				message : sjcl.encrypt(this.encryptionKey, message)
			});
		}

	}

	return new Chat();

});