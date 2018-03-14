const path          = require('path');
const _             = require('underscore');
const HTTP          = require(path.join(__dirname, 'http'));
const Signature     = require(path.join(__dirname, 'signature'));

module.exports = HTTP.extend(function(options) {
  _.extend(this, options);
  this.api_endpoint = '/tapi/'
}).methods({

  url: function() {
    return [this.host, this.api_endpoint].join('');
  },

  headers: function(params) {
    var signer = new Signature({key: this.key, secret: this.secret});
    return signer.sign(params);
  }  
}) 
