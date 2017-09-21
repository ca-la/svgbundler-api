import * as Koa from 'koa';
import * as xml2js from 'xml2js';

type PromiseFn = (data: any) => void;

function parsePromise(str: string): Promise<object> {
  return new Promise((resolve: PromiseFn, reject: PromiseFn): void => {
    xml2js.parseString(str, (err: Error | null, result: object) => {
      if (err) { return reject(err); }
      return resolve(result);
    });
  });
}

export default async function bundleSvgRoute(
  ctx: Koa.Context
): Promise<void> {
  let svgData;

  try {
    svgData = await parsePromise(ctx.request.body);
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
    return;
  }

  ctx.body = svgData;
}
