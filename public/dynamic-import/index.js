const fpPromise = import('https://fpjscdn.net/v3/eajUlf6axysf2z89ZVWx').then(
  (FingerprintJS) => FingerprintJS.load({ region: 'us' }),
);

// Get the visitor identifier when you need it.
fpPromise
  .then((fp) => fp.get())
  .then((result) => console.log(result.visitorId, result.requestId));
