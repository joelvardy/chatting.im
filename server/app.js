var	http = require('http'),
	webSocketServer = require('websocket').server;

var server = http.createServer().listen(6659, function() {
	console.log((new Date())+' Server is listening on port 6659');
});

var webServer = new webSocketServer({
    httpServer: server
});

var pushData = function(clients, data) {
	for(var i in clients){
		clients[i].connection.sendUTF(JSON.stringify(data));
	}
}

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
				clients[clientId].user = {
					name : data.name,
					email : data.email
				};
				pushData(clients, {
					type : 'login',
					user : clients[clientId].user,
					time : new Date()
				});
				break;

			case 'send':
				pushData(clients, {
					type : 'message',
					user : clients[clientId].user,
					sent : new Date(),
					text : data.message
				});
				break;

		}

	});

	connection.on('close', function(reasonCode, description) {
		pushData(clients, {
			type : 'logout',
			user : clients[clientId].user,
			time : new Date()
		});
		delete clients[clientId];
		console.log((new Date())+' User '+connection.remoteAddress+' disconnected');
	});

});