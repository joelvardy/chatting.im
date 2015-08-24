import Ractive from 'node_modules/ractive/ractive.min.js';
import RandomString from 'node_modules/random-string/lib/random-string.js';

export default function (callback = false) {

    var loginView = new Ractive({
        el: 'div.container',
        template: '#login-main',
        data: {
            user: window.user.get()
        }
    });

    loginView.on('submit', function (event) {
        event.original.preventDefault();
        if (!this.get('user.passphrase')) this.set('user.passphrase', RandomString({
            length: 32
        }));
        window.user.set(this.get('user'));
        this.teardown();
        if (callback) callback();
    });

    return loginView;

};
