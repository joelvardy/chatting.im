function Page() {
	//
}

Page.prototype = {

	init: function() {

		this.active = true;

		var hidden, visibilityChange;
		if (typeof document.hidden !== 'undefined') {
			hidden = 'hidden';
			visibilityChange = 'visibilitychange';
		} else if (typeof document.mozHidden !== 'undefined') {
			hidden = 'mozHidden';
			visibilityChange = 'mozvisibilitychange';
		} else if (typeof document.msHidden !== 'undefined') {
			hidden = 'msHidden';
			visibilityChange = 'msvisibilitychange';
		} else if (typeof document.webkitHidden !== 'undefined') {
			hidden = 'webkitHidden';
			visibilityChange = 'webkitvisibilitychange';
		}

		var _this = this;
		document.addEventListener(visibilityChange, function() {
			_this.active = !document[hidden];
			if (typeof _this.visibilityChangeCallback === 'function') {
				_this.visibilityChangeCallback();
			}
		}, false);

	},

	isActive: function() {
		return this.active;
	},

	setVisibilityChangeCallback: function(callback) {
		this.visibilityChangeCallback = callback;
	}

};
