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

var userList = function(clients) {
	var userList = {};
	for(var i in clients){
		userList[i] = {
			key : clients[i].user.key,
			name : clients[i].user.name,
			email : clients[i].user.email
		};
	}
	return userList;
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
					key : Math.random().toString(36, 16).substr(3, 16),
					name : data.name,
					email : data.email
				};
				clients[clientId].connection.sendUTF(JSON.stringify({
					type : 'users',
					users : userList(clients)
				}));
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