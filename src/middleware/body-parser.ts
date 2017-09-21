import * as parse from 'co-body';
import * as Koa from 'koa';

async function bodyParser(
  ctx: Koa.Context,
  next: () => void
): Promise<void> {
  try {
    ctx.request.body = await parse.text(ctx.req);
  } catch (er) {
    ctx.throw(400, 'Unparsable body');
  }

  await next();
}

export default bodyParser;
