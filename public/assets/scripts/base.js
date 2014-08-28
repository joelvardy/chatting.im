Zepto(function($) {

	// Load classes
	window.chat = {
		loading: new Loading(),
		user: new User(),
		cryptography: new Cryptography(),
		chat: new Chat(),
		page: new Page(),
		template: new Template(),
		route: new Route()
	};

	// Start the application
	window.chat.loading.init();
	window.chat.user.init();
	window.chat.chat.init(function() {
		window.chat.page.init();
		window.chat.template.init('/assets/templates/');
		window.chat.route.init();
	}, function() {
		$('#conversation #users').html('');
	});

});
