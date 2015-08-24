import Ractive from 'node_modules/ractive/ractive.min.js';
import User from 'app/User.js';
import Cryptography from 'app/Cryptography.js';
import Conversation from 'app/Conversation.js';
import LoginView from 'app/views/Login.js';
import MessagesView from 'app/views/Messages.js';

Ractive.DEBUG = false;

window.user = new User();
window.cryptography = new Cryptography();
window.conversation = new Conversation();

window.views = {};

window.views.default = new Ractive({
    el: 'div.template',
    template: '#main',
    data: {
        connected: window.conversation.connected()
    }
});

window.views.login = LoginView(() => {
    window.conversation.login();
    window.views.messages = MessagesView();
});
