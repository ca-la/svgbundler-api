# svgthumb-api

An API to generate PNG previews of SVG images. Bundles external contents using
[svgbundler](https://github.com/ca-la/svgbundler) and converts to PNG using
imagemagick.

Accepts POST requests with SVG contents, and returns a URL string.

## Usage

```bash
$ npm install
$ make dev
$ curl -X POST -d "@file.svg" http://localhost:5101

```
