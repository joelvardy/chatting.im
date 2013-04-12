function User() {
	var user;
}

User.prototype = {

	init: function() {
		this.user = {};
	},

	get: function(key) {
		return this.user.key || false;
	},

	set: function(key, value) {
		this.user.key = value;
	}

}