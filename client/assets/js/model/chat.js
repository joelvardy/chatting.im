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
				message = JSON.parse(event.data);
				message.user = sjcl.decrypt(_this.encryptionKey, message.user);
				message.text = sjcl.decrypt(_this.encryptionKey, message.text);
				callback(message);
			});
		},

		login: function(name, encryptionKey) {
			this.encryptionKey = encryptionKey;
			this.push({
				action : 'login',
				name : sjcl.encrypt(this.encryptionKey, name)
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