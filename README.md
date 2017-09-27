# svgthumb-api

A HTTP service to generate PNG previews of SVG images. Bundles external
dependencies using [svgbundler](https://github.com/ca-la/svgbundler), converts
to PNG, then uploads the result to S3.

Accepts `POST /` requests with SVG contents, and returns a URL string.

## Usage

```bash
$ npm install
$ make dev
$ curl -X POST -d "@file.svg" http://localhost:5101
```

## Configuration

Several environment variables must be defined to run an instance of svgthumb:

- `AWS_ACCESS_KEY` - Your AWS access key
- `AWS_SECRET_KEY` - Your AWS secret key
- `AWS_S3_BUCKET_NAME` - The S3 bucket to upload files into

For local development, you can specify these in a `.env` file in the project
directory:

```
$ cat .env
AWS_ACCESS_KEY=123123
AWS_SECRET_KEY='abc12312'
AWS_S3_BUCKET_NAME='svgthumb-uploads-dev'
```

## Roadmap

- Use headless Chrome rather than PhantomJS. Explored using ImageMagick, but the
  results were much worse (many advanced SVG features unsupported).
