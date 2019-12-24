/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';

import * as express from 'express';
import { join } from 'path';
import * as NodeCache from 'node-cache';

// Define landing name
const project = 'item-protocol';

// Cache
const serverCache = new NodeCache();

// Express server
const app = express();
const proxy = require('express-http-proxy');
const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), `dist/${project}/browser`);

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap,
} = require(`./dist/${project}/server/main`);

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  }),
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  }),
);

app.get('/api/*', (req, res) => {
  res.status(404).send('Data requests are not supported');
});

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  const url = req.url.replace(/[^a-z0-9\/]*/gi, '');

  const cache = serverCache.get(url);
  if (cache === undefined) {
    res.render('index', { req }, (err: Error, html: string) => {
      if (!html) {
        res.redirect(404, '/404');
      } else {
        serverCache.set(url, html, 60);
        res.status(200).send(html);
      }
    });
  } else {
    res.status(200).send(cache);
  }
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
