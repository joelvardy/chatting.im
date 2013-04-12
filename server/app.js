var	http = require('http'),
	webSocketServer = require('websocket').server;

var server = http.createServer().listen(1234, function() {
	console.log((new Date())+' Server is listening on port 1234');
});

var webServer = new webSocketServer({
    httpServer: server
});

var connectionCount = 0;
var clients = {};
webServer.on('request', function(request){

	var connection = request.accept('echo-protocol', request.origin);
	var clientId = connectionCount++;
	clients[clientId] = {};
	clients[clientId].connection = connection;

	console.log((new Date())+' User '+connection.remoteAddress+' connected');

	connection.on('message', function(data) {

		// Decode data
		data = JSON.parse(data.utf8Data);

		// Actions
		switch (data.action) {

			case 'login':
				console.log((new Date())+' User '+connection.remoteAddress+' logged in as '+data.name);
				clients[clientId].name = data.name;
				break;

			case 'send':
				var message = {
					user : clients[clientId].name,
					send : new Date(),
					text : data.message
				}
				for(var i in clients){
					clients[i].connection.sendUTF(JSON.stringify(message));
				}
				break;

		}

	});

	connection.on('close', function(reasonCode, description) {
		delete clients[clientId];
		console.log((new Date())+' User '+connection.remoteAddress+' disconnected');
	});

});