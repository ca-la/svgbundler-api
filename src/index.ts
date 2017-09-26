import * as Koa from 'koa';
import * as Router from 'koa-router';

import logger from './middleware/logger';
import headers from './middleware/headers';
import bodyParser from './middleware/body-parser';

import bundleSvgRoute from './routes/bundle-svg';

declare module 'koa' {
  interface Request {
    body: string;
  }
}

const { PORT = 5101 } = process.env;

const app = new Koa();
const router = new Router();

router.post('/', bundleSvgRoute);

app
  .use(logger)
  .use(headers)
  .use(bodyParser)
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(PORT);
  // tslint:disable-next-line:no-console
  console.log(`Running on :${PORT}`);
}
