const path         = require('path');
const _            = require('underscore');
const HTTP         = require(path.join(__dirname, 'http'));

module.exports = HTTP.extend(function(options) {
  _.extend(this, options);
  this.api_endpoint = '/api/3/';

}).methods({

  url: function(method, pairs) {
    var list = [this.host, this.api_endpoint, method];
    if (typeof pairs == 'object') {
      pairs = this.constructPairList(pairs);
    }   
    if (pairs != undefined) {
      list.push('/');
      list.push(pairs);
    }
    return list.join('');
  },

  constructPairList: function(array) {
    return _.map(array, function(pair) { 
      if (pair.indexOf('-')) {
        pair = pair.split('-').join('_').toLowerCase();
      }
      return pair
    }).join('-').toLowerCase();
  },

  depth:  function(pairs, then) {
    this.get({url: this.url('depth', pairs)}, then);     
  },
  
  ticker: function(pairs, then) {
    this.get({url: this.url('ticker', pairs)}, then);      
  },
  
  trades: function(pairs, then) {
    this.get({url: this.url('trades', pairs)}, then);     
  },
  
  info:   function(then) {
    this.get({url: this.url('info')}, then);   
  }

}) 
