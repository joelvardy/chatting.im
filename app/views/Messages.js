import Ractive from 'node_modules/ractive/ractive.min.js';
import $ from 'node_modules/jquery/dist/jquery.min.js';

export default function () {

    var messagesView = new Ractive({
        el: 'div.container',
        template: '#messages-main',
        data: {
            user: window.user.get(),
            conversation: window.conversation.get()
        }
    });

    messagesView.observe('conversation.messages', () => {
        $('body').scrollTop($('body')[0].scrollHeight);
    }, {
        defer: true
    });

    messagesView.on('submit', function (event) {
        event.original.preventDefault();
        if (this.get('newMessage') === '') return;
        window.conversation.send(this.get('newMessage'));
        this.set('newMessage', '');
    });

    return messagesView;

};
