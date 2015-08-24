import SJCL from 'app/vendor/sjcl.js';

export default class {

    constructor() {
        //
    }

    encrypt(string) {
        var user = window.user.get();
        return sjcl.encrypt(user.passphrase, string);
    }

    decrypt(string) {
        var user = window.user.get();
        return sjcl.decrypt(user.passphrase, string);
    }

}
