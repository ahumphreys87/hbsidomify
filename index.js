var transformTools =  require('browserify-transform-tools');
var hbsCompiler = require('./compiler')


var options = {includeExtensions: [".hbs"]};
module.exports = transformTools.makeStringTransform("hbsidomify", options,
  function (content, transformOptions, done) {
      var file = transformOptions.file;

      var result = 'var IncrementalDOM = require(\'incremental-dom\'); module.exports = function(data) {' + hbsCompiler.compile(content) + '};';

      if(!transformOptions.config) {
          return done(new Error("Could not find unbluify configuration."));
      }

      done(null, result);
  }
);