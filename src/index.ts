import * as Koa from 'koa';
import * as Router from 'koa-router';
import {
  bodyParser,
  logger,
  headers
} from '@cala/koa-middleware';

const pkg = require('../package.json');
import createThumbnailRoute from './routes/create-thumbnail';

const { PORT = 8005 } = process.env;

const app = new Koa();
const router = new Router();

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
