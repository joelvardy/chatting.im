import SocketIO from 'node_modules/socket.io-client/socket.io.js';

export default class {

    constructor() {

        this._messages = [];
        this._connection = SocketIO('https://chatting.im:2428');
        this._connected = false;

        var setConnection = () => {
            this._connected = this._connection.connected;
            window.views.default.set('connected', this._connected);
        };

        this._connection.on('connect', setConnection);
        this._connection.on('disconnect', setConnection);

        this.watch();

    }

    connected() {
        return this._connected;
    }

    get() {
        return {
            users: [],
            messages: this._messages
        };
    }

    watch() {

        var _this = this,
            user = window.user.get();

        this._connection.on('users', (users) => {
            var decryptedUsers = [];
            JSON.parse(users).forEach((user) => {
                try {
                    decryptedUsers.push({
                        name: window.cryptography.decrypt(user.name)
                    });
                } catch (e) {}
            });
            window.views.messages.set('conversation.users', decryptedUsers);
        });

        this._connection.on('message', (message) => {
            try {
                message = JSON.parse(message);
                message.from = window.cryptography.decrypt(message.from);
                message.text = window.cryptography.decrypt(message.text);
                message.currentUser = (message.from === user.name);
                _this._messages.push(message);
            } catch (e) {}
        });

    }

    login() {

        var user = window.user.get();

        this._connection.emit('login', {
            name: window.cryptography.encrypt(user.name)
        });

    }

    send(message) {

        this._connection.emit('message', {
            text: window.cryptography.encrypt(message)
        });

    }

}
