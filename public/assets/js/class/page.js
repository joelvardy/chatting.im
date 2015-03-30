function classPage () {
	//
}

classPage.prototype = {

	init: function () {

		var _this = this;

		this.defaultTitle = document.title;
		this.notificationAllowed = true;

		// Load notification sound
		this.notificationSound = new Audio('/assets/audio/notification.mp3');
		this.notificationSound.load();

		this.isVisible = true;
		document.addEventListener('visibilitychange', function (event) {
			_this.isVisible = ! document.hidden;
			if (_this.isVisible) {
				_this.setTitle();
				_this.notificationAllowed = true;
			}
		}, false);

	},

	setTitle: function (value) {

		if (typeof value === 'undefined') {
			value = this.defaultTitle;
		}
		document.title = value;

	},

	notification: function () {

		if ( ! this.notificationAllowed) return;
		this.notificationSound.play();
		this.notificationAllowed = false;

	},

	load: function (templateName, data, events) {

		// Remove previous events
		$('#chat').off();

		$.get('/assets/templates/'+templateName+'.mustache', function (template) {

			$('#chat').attr('template', templateName);

			var element = $('#chat').html(Mustache.render($(template).filter('#template').html(), data));

			// Bind events
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				element.on(event.event, event.selector, event.handler);
			}

			$('[autofocus]', element).focus();

		});

	}

};
