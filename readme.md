# [Chatting][chatting]

This was my first node.js application, however it has since been updated, it quite simply allows people to chat within encrypted *rooms*.

This is not meant for public chatting, but rather groups of people who trust each other and would like to chat securely.

## Install

Run `npm install` in the application route to install dependencies.

## Development

Ensure gulp is running with this command:

```
clear && gulp watch
```

## Usage

Sart the application with this command:

```bash
pm2 start ./app.js --name chatting.im
```

The web socket server will run on port 2428 (which is CHAT when keyed on a keypad.) **Ensure this port is open.**

**Note:** The files stored in `/public` should be served by a conventional web server.

Built by [Joel Vardy][joelvardy].

  [joelvardy]: https://joelvardy.com
  [chatting]: https://chatting.im
