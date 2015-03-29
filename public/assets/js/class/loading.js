function Loading() {
	//
}

Loading.prototype = {

	init: function() {
		//
	},

	element: function() {
		return document.querySelector('div.loading');
	},

	show: function(callback) {
		this.element().style.display = 'block';
		this.element().classList.remove('inactive');
		setTimeout(function() {
			if (typeof callback === 'function') callback();
		}, 250);
	},

	hide: function(callback) {
		var _this = this;
		this.element().classList.add('inactive');
		setTimeout(function() {
			_this.element().style.display = 'none';
			if (typeof callback === 'function') callback();
		}, 250);
	}

};
