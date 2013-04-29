Zepto(function($) {

	// Load classes
	window.chat = {
		user: new User(),
		cryptography: new Cryptography(),
		chat: new Chat(),
		page: new Page(),
		template: new Template(),
		route: new Route()
	};

	// Start the application
	window.chat.user.init();
	window.chat.chat.init();
	window.chat.page.init();
	window.chat.template.init('/assets/templates/');
	window.chat.route.init();

});