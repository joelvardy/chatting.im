# [Chatting][chatting]

This was my first node.js application, however it has since been updated, it quite simply allows people to chat within encrypted *rooms*.

## Install

Run `npm install` in the application route to install dependencies.

## Usage

Sart the application with this command:

```bash
pm2 start ./app.js --name chatting.im
```

The web socket server will run on port 2428 (which is CHAT when keyed on a keypad.) **Ensure this port is open.**

Built by [Joel Vardy][joelvardy].

  [joelvardy]: https://joelvardy.com
  [chatting]: https://chatting.im
