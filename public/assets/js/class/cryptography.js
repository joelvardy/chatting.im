function classCryptography () {
	//
}

classCryptography.prototype = {

	encrypt: function (string) {
		return sjcl.encrypt(chatting.user.get('roomKey'), string);
	},

	decrypt: function (string) {
		return sjcl.decrypt(chatting.user.get('roomKey'), string);
	}

};
