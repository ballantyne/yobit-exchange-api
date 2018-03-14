const path          = require('path');
const _             = require('underscore');
const Authenticated = require(path.join(__dirname, 'authenticated'));

module.exports = Authenticated.extend(function(options) {
  _.extend(this, options);
}).methods({

  getInfo: function(then) {
    this.post({url: this.url(), form: {method: 'getInfo'}}, then)  
  },

  trade: function(options, then) {
    options.method = 'Trade';
    this.post({url: this.url(), form: options}, then)  
  },

  activeOrders: function(options, then) {
    options.method = 'ActiveOrders';
    this.post({url: this.url(), form: options}, then)  
  },

  orderInfo: function(options, then) {
    options.method = 'OrderInfo'
    this.post({url: this.url(), form: options}, then)  
  },
  
  cancelOrder:function(options, then) {
    options.method = 'CancelOrder';
    this.post({url: this.url(), form: options}, then)  
  },

  tradeHistory: function(options, then) {
    options.method = 'TradeHistory';
    this.post({url: this.url(), form: options}, then)  
  },

  getDepositAddress: function(options, then) {
    options.method = 'GetDepositAddress';
    this.post({url: this.url(), form: options}, then)  
  },

  withdrawCoinsToAddress: function(options, then) {
    options.method = 'WithdrawCoinsToAddress';
    this.post({url: this.url(), form: options}, then)  
  },

  createYobicode: function(options, then) {
    options.method = 'CreateYobicode';
    this.post({url: this.url(), form: options}, then)  
  },

  redeemYobicode: function(options, then) {
    options.method = 'RedeemYobicode';
    this.post({url: this.url(), form: options}, then)  
  }

}) 

