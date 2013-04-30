function showHomepage() {

	// Define actions
	var actions = {

		submitForm: function(event) {

			event.preventDefault();

			chat.user.set('passphrase', $('#homepage form #passphrase').val());

			chat.chat.login($('#homepage form #name').val(), $('#homepage form #email').val());

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