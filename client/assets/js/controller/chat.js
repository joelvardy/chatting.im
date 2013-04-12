Zepto(function($) {

	chatModel = window.chat.model;

	// Connect to server
	chatModel.connect();

	// Login
	setTimeout(function () {
		chatModel.send({
			action : 'login',
			name : 'Joel Vardy'
		});
	}, 50);

	// Listen for messages
	chatModel.listen(function(event) {
		message = JSON.parse(event.data);
		$('#messages').append('<p><strong>'+message.user+'</strong><br />'+message.text+'</p>');
	});

	// Send message
	$('#compose').submit(function(event) {
		event.preventDefault();
		chatModel.send({
			action : 'send',
			message : $('textarea', this).val()
		});
	});

});