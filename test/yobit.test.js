var path    = require('path');
var mockery = require('mockery');
var should  = require('chai').should();
var request = require('request-mockery');
const assert  = require('assert');
const _       = require('underscore');
const url   = require('url');
const querystring = require('querystring');

describe('Yobit', function() {
    var Yobit, keys;
    before(function(){
      mockery.enable({
	warnOnReplace: false,
	warnOnUnregistered: false,
	useCleanCache: true
      });
      // request.verbosity(true)
      mockery.registerMock('request', request);
      Yobit = require(path.join(__dirname, '..', 'index'));
      
    });

  after(function(){
    mockery.disable();
  }); 

  describe('Public v2', function() {
    keys = {
      "key": "test",
      "secret": "test",
      api_version: 2
    }

    it('fee', function(done) {
      keys.api_version = 2;
      var yobit = new Yobit(keys)
      yobit.fee('ltc_btc', function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/2/ltc_btc/fee')
        done();
      })
    });
    
    it('ticker', function(done) {
       keys.api_version = 2;
      var yobit = new Yobit(keys)
      yobit.ticker('ltc_btc', function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/2/ltc_btc/ticker')
        done();
      })
    });

    it('depth', function(done) {
      keys.api_version = 2;
      var yobit = new Yobit(keys)
      yobit.depth('ltc_btc', function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/2/ltc_btc/depth')
        done();
      })
    });
    it('trades', function(done) {
      keys.api_version = 2;
      var yobit = new Yobit(keys)
      yobit.trades('ltc_btc', function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/2/ltc_btc/trades')
        done();
      })
    });
  });

  describe('Public v3', function() {
    var keys = {
      "key": "test",
      "secret": "test"
    }

    it('info', function(done) {
      var yobit = new Yobit(keys)
      yobit.info(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/3/info');
        done();
      })
    });
    
    it('ticker', function(done) {
      var yobit = new Yobit(keys)
      yobit.ticker(['ltc_btc'], function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/3/ticker/ltc_btc');
        done();
      })
    });

    it('depth', function(done) {
      var yobit = new Yobit(keys)
      yobit.depth(['ltc_btc'], function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/3/depth/ltc_btc');
        done();
      })
    });
    it('trades', function(done) {
      var yobit = new Yobit(keys)
      yobit.trades(['LTC-BTC'], function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://yobit.net/api/3/trades/ltc_btc');
        done();
      })
    });
  });


  describe('Private', function() {
    it('getInfo', function(done) {
      var yobit = new Yobit(keys)
      yobit.getInfo(function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });
    it('Trade', function(done) {
      var yobit = new Yobit(keys)
      yobit.trade({pair: 'ltc_btc', type: 'buy', rate: 0.11, amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/tapi/');
        assert.equal(result.form.method, 'Trade');
        assert.equal(result.form.pair, 'ltc_btc');
        assert.equal(result.form.rate, 0.11);
        assert.equal(result.form.amount, 1);
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });
    it('ActiveOrders', function(done) {
      var yobit = new Yobit(keys)
      yobit.activeOrders({pair: 'test'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'ActiveOrders');
 
        assert.equal(result.form.pair, 'test');
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('OrderInfo', function(done) {
      var yobit = new Yobit(keys)
      yobit.orderInfo({order_id: 'test'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'OrderInfo');
 
        assert.equal(result.form.order_id, 'test');
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('CancelOrder', function(done) {
      var yobit = new Yobit(keys)
      yobit.cancelOrder({order_id: 'test'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'CancelOrder');
 
        assert.equal(result.form.order_id, 'test');
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('TradeHistory', function(done) {
      var yobit = new Yobit(keys)
      yobit.tradeHistory({from: 0, count: 1000, from_id: 0, order: 'ASC', since: 0, pair: 'ltc_btc'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'TradeHistory');
 
        assert.equal(result.form.from, 0);
        assert.equal(result.form.count, 1000);
        assert.equal(result.form.from_id, 0);
        assert.equal(result.form.order, 'ASC');
        assert.equal(result.form.since, 0);
        assert.equal(result.form.pair, 'ltc_btc');


        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('GetDepositAddress', function(done) {
      var yobit = new Yobit(keys)
      yobit.getDepositAddress({coinName: 'test', need_new: 0}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'GetDepositAddress');
        assert.equal(result.form.coinName, 'test');
        assert.equal(result.form.need_new, 0);
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('WithdrawCoinsToAddress', function(done) {
      var yobit = new Yobit(keys)
      yobit.withdrawCoinsToAddress({coinName: 'ETH', address: 'test', amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        
        assert.equal(result.form.method, 'WithdrawCoinsToAddress');
        assert.equal(result.form.coinName, 'ETH');
        assert.equal(result.form.address, 'test');
        assert.equal(result.form.amount, 1);
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('CreateYobicode', function(done) {
      var yobit = new Yobit(keys)
      yobit.createYobicode({currency: 'test', amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'CreateYobicode');
        assert.equal(result.form.currency, 'test');
        assert.equal(result.form.amount, 1);
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });

    it('RedeemYobicode', function(done) {
      var yobit = new Yobit(keys)
      yobit.redeemYobicode({coupon: 'test', Username: 'test', Amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.method, 'RedeemYobicode');
        assert.equal(result.form.coupon, 'test');
        assert.equal(parsed.url.pathname, '/tapi/')
        assert.equal(result.headers.key, 'test');
        done();
      })   
    });







  });
});
