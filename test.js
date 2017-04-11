var phantom = require('./');
var test = require('tape');
var concat = require('concat-stream');
var phantomjs = require('phantomjs-prebuilt-that-works');

test('execute', function(t){
  var browser = phantom();

  browser.on('data', function(l){
    browser.kill();
    t.ok(l);
    t.end();
  });

  browser.end('console.log(window.location)');
});

test('exit event', function(t){
  var browser = phantom();

  browser.on('exit', function(code){
    t.equal(code, 0);
    t.end();
  });

  browser.end('phantom.exit()');
});

test('uncaught error', function(t){
  var browser = phantom();

  browser.pipe(concat(function(data){
    var out = data.toString();
    t.ok(out.indexOf('Error') > -1);
    t.ok(out.indexOf('foo') > -1);
    t.ok(out.indexOf('bar') > -1);
    t.ok(out.indexOf(':1') > -1);
    t.end();
  }));

  browser.write('setTimeout(phantom.exit);');
  browser.end('(function foo(){throw new Error(\'bar\')})()');
});

test('path', function(t){
  t.plan(1);
  var browser = phantom({ path: phantomjs.path });

  browser.on('data', function(l){
    browser.kill();
    t.equal(l.toString(), '2\n');
    t.end();
  });

  browser.end('console.log(1 + 1)');
});

test('bad path', function(t){
  t.plan(2);
  var browser = phantom({ path: './this/does/not/exist' });
  browser.on('error', function (err) {
    t.ok(err);
    t.equal(err.code, 'ENOENT', 'file does not exist');
    t.end();
  });
  browser.end('console.log(1 + 1)');
});
