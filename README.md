# svgbundler-api

A very small API wrapper around
[svgbundler](https://github.com/ca-la/svgbundler).

Accepts POST requests with SVG contents, which it bundles and returns.

## Usage

```bash
$ npm install
$ make dev
$ curl -X POST -d "@file.svg" http://localhost:8083 > file-bundled.svg

```
