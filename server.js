require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
// Define Pusher
var Pusher = require('pusher');

// Create pusher instance
var pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_APP_KEY,
	secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER
});

moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');

app.use('/public', express.static(path.join(__dirname, 'public')));



let events = [
  {
    description: 'Random event 1',
    date: moment('2019-03-29', 'YYYY-MM-DD')
  },
  {
      description: 'Random event 2',
      date: moment('2019-03-15', 'YYYY-MM-DD')
  },
  {
      description: 'Random event 3',
      date: moment('2019-02-28', 'YYYY-MM-DD')
  }
];

// app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Create reference to Server Side Renderer variable
let renderer; 

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  // Create marker for index page where comment lives
  let contentMarker = '<!--APP-->';

  if (renderer) {
    renderer.renderToString({ events }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(template.replace(contentMarker, `<script>var __INITIAL_STATE__ = ${ serialize(events)}</script>\n${html}`));
      }
    });
  } else {
    res.send('<p>Awaiting compilation...</p><script src="/reload/reload.js"></script>');
  }

});


// post to add_event and push in data to events array
app.use(require('body-parser').json());

app.post('/add_event', (req, res) => {
  // pusher.trigger('calendar', 'update', {
  //   description: req.body.description,
  //   date: moment(req.body.date)
  // });

  pusher.trigger('calendar', 'event_added', {
    description: req.body.description,
    date: moment(req.body.date)
  });

  events.push({
    description: req.body.description,
    date: moment(req.body.date)
  });
  res.sendStatus(200);
});


const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(function(bundle) {
    // Pass in the Bundle and take the Vue Instance to output the correct 
    // Server Rendered version of the app.
    // NPM: https://www.npmjs.com/package/vue-server-renderer
    // Guide: https://ssr.vuejs.org/en/
    let needsReload = (renderer === undefined);
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
    if (needsReload) {
      reloadServer.reload();
    }
  });
}

if (process.env.NODE_ENV === 'production') {
  let bundle = fs.readFileSync('./dist/node.bundle.js', 'utf-8');
  renderer = require('vue-server-renderer').createBundleRenderer(bundle);
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("opn")(`http://localhost:${process.env.PORT}`);
  }
});
