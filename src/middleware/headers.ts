import * as Koa from 'koa';

// tslint:disable-next-line:no-var-requires
const pkg = require('../../package.json');

async function headers(
  ctx: Koa.Context,
  next: () => void
): Promise<void> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  ctx.set('X-Powered-By', [pkg.name, pkg.version].join('@'));

  await next();
}

export default headers;
