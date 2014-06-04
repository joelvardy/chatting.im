// @codekit-prepend "vendor/cryptography.js";
// @codekit-prepend "vendor/md5.js";
// @codekit-prepend "vendor/ejs.js";
// @codekit-prepend "class/user.js";
// @codekit-prepend "class/cryptography.js";
// @codekit-prepend "class/chat.js";
// @codekit-prepend "class/page.js";
// @codekit-prepend "class/template.js";
// @codekit-prepend "class/route.js";
// @codekit-prepend "controller/homepage.js";
// @codekit-prepend "controller/chat.js";

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
	window.chat.chat.init(function() {
		window.chat.page.init();
		window.chat.template.init('/assets/templates/');
		window.chat.route.init();
	});

});
