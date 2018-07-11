import * as test from 'tape';
import { stub } from 'sinon';

import * as request from 'supertest';
import app from './src/index';
import * as aws from './src/services/aws';

const testSvg = '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="2"/></svg>';

test('svgthumb-api POST /', (t: test.Test): void => {
  t.plan(3);

  const consoleStub = stub(console, 'log');
  const awsUploadStub = stub(aws, 'upload').returns(Promise.resolve('S3 URL'));
  const server = app.listen();

  request(server)
    .post('/')
    .set('Content-Type', 'text/plain')
    .send(testSvg)
    .expect('X-Powered-By', /svgthumb-api/)
    .expect('S3 URL')
    .end((error: Error): void => {
      consoleStub.restore();
      server.close();
      t.notOk(error, 'does not return an error');
      t.ok(consoleStub.calledOnce, 'logs request');
      t.ok(awsUploadStub.calledOnce, 'calls AWS upload');
    });
});
