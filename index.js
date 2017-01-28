var hbsCompiler = require('handlebars-idom');
var through = require('through');

var filenamePattern = /\.(html|handlebars|hbs)$/;

var wrap = function (template) {
  return 'var IncrementalDOM = require("incremental-dom");' +
    'module.exports = function(data) { ' + template + '};';
}

module.exports = function (file, options) {
  if (!options.filenamePattern) {
    options.filenamePattern = filenamePattern;
  }

  var regex = new RegExp(options.filenamePattern);
  if (!regex.test(file)) return through();

  var input = '';
  var write = function (buffer) {
    input += buffer;
  };

  var end = function () {
    this.queue(wrap(hbsCompiler.compile(input)));
    this.queue(null);
  };

  return through(write, end);
};