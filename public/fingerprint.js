// Initialize the agent at application startup.
// @ts-ignore
const fpPromise = import("https://fpjscdn.net/v3/2UZgp3skqLzfJpFUGUrw").then(
  (FingerprintJS) =>
    FingerprintJS.load({
      region: "eu",
    })
);

// Get the visitor identifier when you need it.
fpPromise
  .then((fp) => fp.get())
  .then((result) => {
    // This is the visitor identifier:
    const visitorId = result.visitorId;
    console.log(visitorId);
  });
