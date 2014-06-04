function Cryptography() {
	//
}

Cryptography.prototype = {

	encrypt: function(string) {
		return sjcl.encrypt(chat.user.get('passphrase'), string);
	},

	decrypt: function(string) {
		return sjcl.decrypt(chat.user.get('passphrase'), string);
	}

};
