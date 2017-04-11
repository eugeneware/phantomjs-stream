
# phantomjs-stream

  Simple streaming wrapper around phantomjs(1).

  [![build status](https://secure.travis-ci.org/juliangruber/phantomjs-stream.svg)](http://travis-ci.org/juliangruber/phantomjs-stream)

## Example

```js
var phantom = require('phantomjs-stream');

var browser = phantom();

browser.pipe(process.stdout);
setTimeout(browser.kill.bind(browser), 2000);

browser.end('console.log(window.location)');
```

## Installation

```bash
$ npm install phantomjs-stream
```

## API

### phantom([options])

Create a duplex stream around a newly spawned `phantomjs` which forwards written data to `phantomjs` and outputs the browser's console output.

Options:

  - `path`: By default `phantomjs-stream` will try to search for the binary `phantomjs` in it's current `PATH`. To override this, you can pass the full path to your own `phantomjs` binary through.

### phantom#kill()

Kill the child process.

### phantom#on('exit', fn)

Emitted when the underlying `phantomjs` exits. There can be multiple reasons for this:

- `phantom#kill()` was called
- `phantom.exit()` was sent as a script
- there was a fatal error

## License

  MIT

