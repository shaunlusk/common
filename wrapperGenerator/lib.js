var has_require = typeof require !== 'undefined';
var global = global || {};

var SL = global.SL;

if( typeof SL === 'undefined' ) {
  if( has_require ) {
    SL = require('../Utils.js');
  }
  else throw new Error('Requires slcommon Utils.js');
}

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

function generateWrapper(cls, memberName, wrapperName) {
  var keys = Object.keys(cls.prototype);

  var methodKeys = keys.filter(function(key) {
    return SL.isFunction(cls.prototype[key]) && key !== "constructor";
  });

  var str = wrapperName + " = function(" + memberName + ") {\n" +
      "  this._" + memberName + " = " + memberName + ";\n" +
    "}; \n";
  var wrappedMethods = methodKeys.map(function (methodKey) {
    var method = cls.prototype[methodKey];
    var params = getParamNames(method).join(",");
    var methodString = wrapperName + ".prototype." + methodKey +
        " = function(" + params + ") {\n" +
        "  this._" + memberName +
        "." + methodKey + "(" + params + ");\n" +
        "}";
    return methodString;
  });
  str += wrappedMethods.join("\n");
  return str;
}

if( typeof exports !== 'undefined' ) {
  if( typeof module !== 'undefined' && module.exports ) {
    exports = module.exports = generateWrapper;
  }
  exports.generateWrapper = generateWrapper;
}
else {
  global.generateWrapper = generateWrapper;
}
