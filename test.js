(function(){

	"use strict";

	var config = require('./config');

	var fs = require('fs'),
		https = require('https'),
		webSocket = require('ws');

	var httpsServer = https.createServer({
		key: fs.readFileSync(config.ssl_key),
		cert: fs.readFileSync(config.ssl_cert)
	}).listen(config.port);

	var webSocketServer = new webSocket.Server({
		server: httpsServer
	});

	webSocketServer.broadcast = function(data) {
		for(var i in this.clients) {
			this.clients[i].send(data);
		}
	};

	webSocketServer.on('connection', function(wsConnect) {

		console.log('Event: User connected to server');

		wsConnect.on('message', function(message) {

			console.log(message);

			webSocketServer.broadcast(message);

		});

	});


}());
