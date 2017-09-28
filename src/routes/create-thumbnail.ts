import * as Koa from 'koa';
import * as svg2png from 'svg2png';
import bundle from 'svgbundler';
import * as uuid from 'node-uuid';

import { AWS_S3_BUCKET_NAME, CLIENT_TOKEN } from '../config';
import { upload } from '../services/aws';

const MAX_PNG_SIZE_BYTES = 1e7; // 10Mb
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/;

export default async function createThumbnailRoute(
  ctx: Koa.Context
): Promise<void> {
  let bundled;

  if (
    CLIENT_TOKEN &&
    ctx.headers.authorization !== `Token ${CLIENT_TOKEN}`
  ) {
    ctx.throw(401, 'Missing or invalid client token');
  }

  const itemId = ctx.params.id || uuid.v4();
  ctx.assert(UUID_PATTERN.test(itemId), 400, 'Invalid UUID format');

  try {
    bundled = await bundle(ctx.request.body);
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
    return;
  }

  const buffer = Buffer.from(bundled, 'utf8');
  const pngBuffer: Buffer = await svg2png(buffer);

  ctx.assert(pngBuffer.byteLength <= MAX_PNG_SIZE_BYTES, 400, 'Resultant image is too large');

  const url = await upload(
    pngBuffer,
    AWS_S3_BUCKET_NAME,
    itemId,
    'image/png',
    'public-read'
  );

  ctx.body = url;
}
