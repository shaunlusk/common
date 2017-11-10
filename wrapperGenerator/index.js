var has_require = typeof require !== 'undefined';
var global = global || {};
var SL = global.SL;

// not fully browser ready.
var modulePath = process.argv[2];
var className = process.argv[3];
var innerMemberName = process.argv[4];
var wrapperName = process.argv[5];
var generateWrapper = global.generateWrapper;
var cls = global[className];

if( typeof generateWrapper === 'undefined' ) {
  if( has_require ) {
    generateWrapper = require('./lib.js');
  }
  else throw new Error('Requires wrapperGenerator lib.js.');
}

if( typeof cls === 'undefined' ) {
  if( has_require ) {
    cls = require(modulePath)[className];
  }
  else throw new Error('Requires module: ' + modulePath);
}

var wrapper = generateWrapper(cls, innerMemberName, wrapperName);

console.log(wrapper);
