import * as Koa from 'koa';
import bundle from 'svgbundler';

export default async function bundleSvgRoute(
  ctx: Koa.Context
): Promise<void> {
  let bundled;

  try {
    bundled = await bundle(ctx.request.body);
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
    return;
  }

  ctx.body = bundled;
}
