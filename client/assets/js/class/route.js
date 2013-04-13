function Route() {
	//
}

Route.prototype = {

	init: function() {

		var _this = this;

		// Run routes on hash change
		$(window).bind('hashchange', function() {
			_this.run();
		});

		// Run routes in initialisation
		this.run();

	},

	clearHash: function() {

		window.location.hash = '';
		if (typeof window.history.replaceState == 'function') {
			window.history.replaceState({}, '', window.location.href.slice(0, -1));
		}

	},

	getHash: function() {

		return window.location.hash.substring(3);

	},

	setHash: function(hash) {

		history.pushState({}, 'Chat', '#!/'+hash);
		this.run();

	},

	goBack: function() {

		history.back();

	},

	run: function() {

		var _this = this;

		// Chat
		if (this.getHash().match('^chat/(.*)$')) {

			// Set the user passphrase
			chat.user.set('passphrase', this.getHash().match('^chat/(.*)$')[1]);
			if ( ! chat.chat.isLoggedin()) {
				var email = prompt('Enter your email: (ensure gravatar is available)');
				chat.chat.login(email);
			}
			showChat();

			return;
		}

		// No route has been matched, show homepage
		this.clearHash();
		showHomepage();

	}

}