import * as Koa from 'koa';

import * as COLORS from '../services/colors';

// Middleware to log timing & info for each incoming request

async function logger(ctx: Koa.Context, next: () => void): Promise<any> {
  const start = Date.now();
  try {
    await next();
  } catch (err) { /* noop */ }

  const ms = Date.now() - start;

  const ip = ctx.request.headers['cf-connecting-ip'] || ctx.request.ip;
  const ua = ctx.request.headers['user-agent'];

  const statusColor = (ctx.status < 400) ? COLORS.green : COLORS.red;
  // tslint:disable-next-line
  console.log(`${statusColor}${ctx.status}${COLORS.reset} ${ctx.method} ${COLORS.blue}${ctx.url}${COLORS.reset} ms:${ms} ip:${ip} ua:"${ua}"`);
}

export default logger;
