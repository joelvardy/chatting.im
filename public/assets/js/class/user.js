function classUser () {
	//
}

classUser.prototype = {

	init: function () {
		this.user = {};
	},

	get: function (keyName) {
		return this.user[keyName] || false;
	},

	set: function (keyName, value) {
		this.user[keyName] = value;
	}

};
