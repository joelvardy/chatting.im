define(function() {

	function Chat() {
		var	connection;
	}

	Chat.prototype = {

		connect: function() {
			this.connection = new WebSocket('ws://192.168.0.33:1234', 'echo-protocol');
		},

		send: function(data) {
			this.connection.send(JSON.stringify(data));
		},

		listen: function(callback) {
			this.connection.addEventListener('message', callback);
		}

	}

	return new Chat();

});