# [Chatting.im][chatting]

My first node.js application, it quite simply allows people to chat within encrypted *rooms*.

## Install

Run `npm install` in the application route to install dependencies.

## Usage

Sart the application with this command:

```bash
pm2 start ./app.js -i max --name chatting.im
```

The web socket server will run on port 2428 (which is CHAT when keyed on a keypad.)

[Joel Vardy][joelvardy]

  [joelvardy]: https://joelvardy.com
  [chatting]: https://chatting.im
