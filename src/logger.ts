import * as qs from 'querystring';
import * as Koa from 'koa';

// Middleware to log timing & info for each incoming request

interface Data { [key: string]: string | number; }

function stringify(obj: Data): string {
  const escaped: Data = {};

  Object.keys(obj).forEach((key: string): void => {
    escaped[key] = JSON.stringify(obj[key]);
  });

  return qs.stringify(escaped, ', ', '=', {
    encodeURIComponent: (val: string): string => val
  });
}

async function logger(ctx: Koa.Context, next: () => void): Promise<any> {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  /* tslint:disable-next-line:no-console */
  console.log(stringify({
    connectingIp: ctx.request.headers['cf-connecting-ip'],
    method: ctx.method,
    requestIp: ctx.request.ip,
    responseTime: ms,
    status: ctx.status,
    url: ctx.url,
    userAgent: ctx.request.headers['user-agent']
  }));
}

export default logger;
