function Chat() {
	var connection,
		loggedin = false;
}

Chat.prototype = {

	init: function() {
		this.connection = new WebSocket('ws://chatting.im:6659', 'echo-protocol');
	},

	isLoggedin: function() {
		return this.loggedin;
	},

	push: function(data) {
		setTimeout(function () {
			chat.chat.connection.send(JSON.stringify(data));
		}, 50);
	},

	listen: function(callback) {
		var _this = this;
		this.connection.addEventListener('message', function(event) {
			try {
				message = JSON.parse(event.data);
				if (typeof message.user != 'undefined') {
					message.user.name = chat.cryptography.decrypt(message.user.name);
					message.user.email = chat.cryptography.decrypt(message.user.email);
				}
				if (typeof message.users != 'undefined') {
					for(var i in message.users){
						message.users[i].name = chat.cryptography.decrypt(message.users[i].name);
						message.users[i].email = chat.cryptography.decrypt(message.users[i].email);
					}
				}
				if (typeof message.text != 'undefined') {
					message.text = chat.cryptography.decrypt(message.text);
				}
				callback(message);
			} catch(exception) {
				//
			}
		});
	},

	login: function(name, email) {
		this.push({
			action : 'login',
			name : chat.cryptography.encrypt(name),
			email : chat.cryptography.encrypt(email)
		});
		this.loggedin = true;
	},

	send: function(message) {
		this.push({
			action : 'send',
			message : chat.cryptography.encrypt(message)
		});
	}

}