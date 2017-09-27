import * as Koa from 'koa';
import * as svg2png from 'svg2png';
import bundle from 'svgbundler';
import * as uuid from 'node-uuid';

import { AWS_S3_BUCKET_NAME } from '../config';
import { upload } from '../services/aws';

export default async function createThumbnailRoute(
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

  const buffer = Buffer.from(bundled, 'utf8');
  const pngBuffer: Buffer = await svg2png(buffer);

  const url = await upload(
    pngBuffer,
    AWS_S3_BUCKET_NAME,
    uuid.v4(),
    'image/png',
    'public-read'
  );

  ctx.body = url;
}
