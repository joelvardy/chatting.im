function showHomepage() {

	// Define actions
	var actions = {

		submitForm: function(event) {

			event.preventDefault();

			chat.user.set('passphrase', $('#homepage form #passphrase').val());
			chat.user.set('name', chat.cryptography.encrypt($('#homepage form #name').val()));
			chat.user.set('email', chat.cryptography.encrypt($('#homepage form #email').val()));

			chat.chat.login();

			chat.route.setHash('chat/'+chat.user.get('passphrase'));

		}

	}

	// Load homepage view
	var homepageElement = chat.template.build('homepage.ejs', {
		'passphrase' : chat.user.get('passphrase')
	}, actions);

	// Set the view
	$('#chat').empty().append(homepageElement);

}