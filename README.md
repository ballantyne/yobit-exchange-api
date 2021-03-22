
yobit-exchange-api
------------


This is a very simple api client that helps interact with the [yobit](https://yobit.io/?bonus=UMnbn) cryptocurrency exchange api.  


Installation
------------
```bash
npm install yobit-exchange-api --save
```

Usage
------------

```javascript

var Yobit = require('yobit-exchange-api');
var VersionTwo = require('yobit-exchange-api/lib/version_two');
var Trade = require('yobit-exchange-api/lib/trade');

var keys = {key: '', secret: ''}
var yobit = new Yobit(keys)
var version2 = new VersionTwo(keys);
var trade = new Trade(keys);

trade.getInfo(function(err, data) {
  console.log(data);
})

version2.ticker('ltc_btc', function(err, data) {
  console.log(data);
})

version2.depth('ltc_btc', function(err, data) {
  console.log(data);
})

version2.trades('ltc_btc', function(err, data) {
  console.log(data);
})

yobit.fee(['ETH-BTC'], function(err, data) {
  console.log(data);
})

yobit.ticker(['ETH-BTC'], function(err, data) {
  console.log(data);
})

yobit.depth(['ETH-BTC'], function(err, data) {
  console.log(data);
})

yobit.trades(['ETH-BTC'], function(err, data) {
  console.log(data);
})

yobit.info(function(err, data) {
  console.log(data);
})

```




Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/yobit-exchange-api/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/yobit-exchange-api/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/yobit-exchange-api/graphs/contributors)!


License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright
-------
© 2018 Scott Ballantyne. See LICENSE for details.
