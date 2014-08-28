(function () {

	"use strict";

	var config = require('./config');

	var fs = require('fs'),
		uuid = require('node-uuid'),
		https = require('https'),
		webSocket = require('ws');

	var httpsServer = https.createServer({
		key: fs.readFileSync(config.ssl_key),
		cert: fs.readFileSync(config.ssl_cert)
	}).listen(config.port);

	var webSocketServer = new webSocket.Server({
		server: httpsServer
	});

	var userList = function(clients) {
		var userList = {};
		for (var i in clients) {
			if (typeof clients[i].user === 'undefined') continue;
			userList[i] = {
				reference : clients[i].user.reference,
				name : clients[i].user.name,
				email : clients[i].user.email
			};
		}
		return userList;
	}

	var pushData = function(clients, data) {
		for(var i in clients){
			clients[i].connection.send(JSON.stringify(data));
		}
	}

	var pushUsers = function(clients) {
		pushData(clients, {
			type : 'users',
			users : userList(clients),
			time : new Date()
		});
	}


	var clients = {},
		connectionCount = 1;

	webSocketServer.on('connection', function (connection) {

		var clientId = connectionCount++;

		console.log(new Date()+' User ('+clientId+') connected to server');

		clients[clientId] = {
			connection: connection
		};

		connection.on('message', function (data) {

			// Decode data
			data = JSON.parse(data);

			console.log(new Date()+' Message received from user ('+clientId+')');

			// Actions
			switch (data.action) {

				case 'login':
					clients[clientId].user = {
						reference : uuid.v4(),
						name : data.name,
						email : data.email
					};
					pushUsers(clients);
					break;

				case 'message':
					pushData(clients, {
						type : 'message',
						user : clients[clientId].user,
						sent : new Date(),
						text : data.message
					});
					break;

			}

		});

		connection.on('close', function () {

			console.log(new Date()+' User ('+clientId+') disconnected from server');

			delete clients[clientId];

			pushUsers(clients);

		});

	});


}());
