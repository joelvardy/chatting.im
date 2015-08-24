var fs = require('fs'),
    config = require('./config');

var server = require('https').createServer({
    key: fs.readFileSync(config.ssl_key),
    cert: fs.readFileSync(config.ssl_cert)
}).listen(config.port);

var io = require('socket.io')(server);

var connections = [],
    users = [];

var pushData = function (type, data) {
    for (var i in connections) {
        connections[i].emit(type, JSON.stringify(data));
    }
};

io.on('connection', function (socket) {

    var connectionId = connections.push(socket) - 1,
        userId;

    socket.on('login', function (data) {
        userId = users.push({
            name: data.name
        }) - 1;
        connections[connectionId].userName = data.name;
        pushData('users', users);
    });

    socket.on('message', function (message) {
        pushData('message', {
            from: connections[connectionId].userName,
            text: message.text
        });
    });

    socket.on('disconnect', function () {
        delete connections[connectionId];
        if (typeof userId === 'number') {
            users.splice(userId, 1);
            pushData('users', users);
        }
    });

});
