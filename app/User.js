export default class {

    constructor() {
        this._user = {
            passphrase: window.location.href.split('#')[1] || false,
            name: ''
        };
    }

    get() {
        return this._user;
    }

    set(user) {
        this._user = user;
        window.location.hash = this._user.passphrase;
    }

}
