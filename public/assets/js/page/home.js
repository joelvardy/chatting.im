function pageHome () {
	//
}

pageHome.prototype = {

	init: function () {
		page('/', function () {

			chatting.page.load('login', {
				userloggedIn: chatting.chat.loggedIn
			}, [{
				selector: 'form.login',
				event: 'submit',
				handler: function (event) {

					event.preventDefault();
					chatting.user.set('name', $('input', event.target).val());

					// Generate random roomKey
					chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
					roomKey = '';
					for (x = 0; x < 16; x++) {
						var i = Math.floor(Math.random() * 62);
						roomKey += chars.charAt(i);
					}

					page.redirect('/'+roomKey);

				}
			}]);

		});
	}

};
