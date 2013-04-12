Zepto(function($) {

	chatModel = window.chat.model;

	// Connect to server
	chatModel.connect();

	// Login
	setTimeout(function () {
		chatModel.login('Joel Vardy', 'testing');
	}, 50);

	// Listen for messages
	chatModel.listen(function(message) {
		$('#messages').append('<p><strong>'+message.user+'</strong><br />'+message.text+'</p>');
	});

	// Send message
	$('#compose').submit(function(event) {
		event.preventDefault();
		chatModel.send($('textarea', this).val());
	});

});