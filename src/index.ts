import * as Koa from 'koa';
import * as Router from 'koa-router';

import logger from './logger';
import bundleSvg from './bundle-svg';

const { PORT = 8083 } = process.env;

const app = new Koa();
const router = new Router();

router.post('/', bundleSvg);

app
  .use(logger)
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(PORT);
  // tslint:disable-next-line:no-console
  console.log(`Running on :${PORT}`);
}
