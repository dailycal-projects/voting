const { argv } = require('yargs');
const app = require('../../server/server.js');
const nodemon = require('gulp-nodemon');
const ngrok = require('ngrok');
const open = require('open');
const portfinder = require('portfinder');

const port = argv.port || 3000;

const startTunnel = (servePort) => {
  ngrok.connect({
    authtoken: process.env.ngrokToken,
    auth: 'interactive:news',
    subdomain: 'dailycal',
    addr: servePort,
  }, (err, url) => { open(url); });
};

module.exports = (cb) => {
  portfinder.basePort = port;

  portfinder.getPortPromise()
    .then((foundPort) => {
      nodemon({
        script: 'server/server.js',
        env: { NODE_ENV: 'development' },
        args: ['--port', foundPort.toString()],
        ignore: ['*'],
      });
      app.startServer(foundPort);
      if (argv.ngrok) {
        startTunnel(foundPort);
      }
      cb();
    })
    .catch((err) => {
      console.error(err);
      cb();
    });
};
