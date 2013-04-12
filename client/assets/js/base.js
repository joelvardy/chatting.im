Zepto(function($) {

	// Load classes
	window.chat = {
		user: new User(),
		cryptography: new Cryptography(),
		chat: new Chat(),
		template: new Template(),
		route: new Route()
	};

	// Start the application
	window.chat.user.init();
	window.chat.chat.init();
	window.chat.template.init();
	window.chat.route.init();

});