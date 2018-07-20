import * as Koa from 'koa';
import * as Router from 'koa-router';
import { bodyParser, headers, logger } from '@cala/koa-middleware';
import createThumbnailRoute from './routes/create-thumbnail';

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');

const { PORT = 8005 } = process.env;

const app = new Koa();
const router = new Router();

declare module 'koa' {
  interface Request {
    body: any;
  }
}

router.post('/', createThumbnailRoute);
router.put('/:id', createThumbnailRoute);

app
  .use(logger())
  .use(headers({
    poweredBy: `${pkg.name} ${pkg.version}`
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(PORT);
  // tslint:disable-next-line:no-console
  console.log(`Running on :${PORT}`);
}

export default app;
