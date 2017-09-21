import * as Koa from 'koa';
import * as xml2js from 'xml2js';

function parsePromise(str: string): object {
  return new Promise((resolve, reject) => {
    xml2js.parseString(str, (err, result) => {
      if (err) { return reject(err); }
      return resolve(result);
    });
  });
}

export default async function bundleSvg(
  ctx: Koa.Context
): Promise<void> {
  const svgData = await parsePromise('ok');
  ctx.body = svgData;
}
