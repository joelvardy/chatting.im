function classLoading () {
	//
}

classLoading.prototype = {

	init: function () {
		this.transition = 250;
		this.show();
	},

	show: function (callback) {
		$('div.loading').show();
		$('div.loading').addClass('active');
		setTimeout(function () {
			if (typeof callback === 'function') callback();
		}, this.transition);
	},

	hide: function (callback) {
		$('div.loading').removeClass('active');
		setTimeout(function () {
			$('div.loading').hide();
			if (typeof callback === 'function') callback();
		}, this.transition);
	}

};
