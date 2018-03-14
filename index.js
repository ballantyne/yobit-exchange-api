const klass        = require('klass');
const _            = require('underscore');

const path         = require('path');
const VersionTwo   = require(path.join(__dirname, 'lib', 'version_two'));
const VersionThree = require(path.join(__dirname, 'lib', 'version_three'));
const Trade        = require(path.join(__dirname, 'lib', 'trade'));
var api, authenticated;

module.exports = klass(function(options) {
  if (options == undefined) {
    options = {};
  } 
  
  if (options.api_version == 2) {
    api = new VersionTwo(options.verbose);
  } else {
    api = new VersionThree(options.verbose);
  }
  
  if (options.key != undefined && options.secret != undefined) {
    authenticated = new Trade({
      verbose: options.verbose, 
      key: options.key, 
      secret: options.secret
    });
  } 

}).methods({

  depth: function(pairs, then) {
    api.depth(pairs, then); 
  },

  ticker: function(pairs, then) {
    api.ticker(pairs, then); 
  },
  
  trades: function(pairs, then) {
    api.trades(pairs, then);
  },
  
  info:   function(then) {
    var api3 = new VersionThree()
    api3.info(then);
  },

  fee: function(pair, then) {
    var api2 = new VersionTwo();
    api2.fee(pair, then); 
  },

  getInfo: function(then) {
    authenticated.getInfo(then);  
  },
  
  trade: function(options, then) {
    authenticated.trade(options, then); 
  },
  
  activeOrders: function(options, then) {
    authenticated.activeOrders(options, then);
  },
  
  orderInfo: function(options, then) {
    authenticated.orderInfo(options, then); 
  },
  
  cancelOrder: function(options, then) {
    authenticated.cancelOrder(options, then);
  },
  
  tradeHistory: function(options, then) {
    authenticated.tradeHistory(options, then);
  },
  
  getDepositAddress: function(options, then) {
    authenticated.getDepositAddress(options, then);
  },
  
  withdrawCoinsToAddress: function(options, then) {
    authenticated.withdrawCoinsToAddress(options, then);
  },
  
  createYobicode: function(options, then) {
    authenticated.createYobicode(options, then);
  },
  
  redeemYobicode: function(options, then) {
    authenticated.redeemYobicode(options, then);
  }
  

}) 
