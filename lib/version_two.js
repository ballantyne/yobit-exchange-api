const path        = require('path');
const _           = require('underscore');
const HTTP        = require(path.join(__dirname, 'http'));

module.exports = HTTP.extend(function(options) {
  _.extend(this, options);
  this.api_endpoint = '/api/2/';
}).methods({

  url: function(method, pair) {
    if (typeof pair == 'object') {
      pair = pair[0];
    }
    if (pair.indexOf('-')) {
      pair = pair.split('-').join('_').toLowerCase();
    }
    return [this.host, this.api_endpoint, pair, '/', method].join('');
  },

  depth:  function(pair, then) {
    this.get({url: this.url('depth', pair)}, then)     
  },
  
  ticker: function(pair, then) {
    this.get({url: this.url('ticker', pair)}, then)      
  },
  
  trades: function(pair, then) {
    this.get({url: this.url('trades', pair)}, then)      
  },
  
  fee:   function(pair, then) {
    this.get({url: this.url('fee', pair)}, then)     
  }

}) 
