### Query parameters

```js
// Forward all query parameters
proCDNURL.search = req.url.split('?')[1];
console.log(proCDNURL);
```

This is weird, it works but you end up with `https://fpcdn.io/v3/2UZgp3skqLzfJpFUGUrw/loader_v3.8.5.js?apiKey=2UZgp3skqLzfJpFUGUrw&version=3&loaderVersion=3.8.5`. Our SDKs don't even add tracking parameters to the agent download request AFAIK. What are you expecting to forward here?

### Headers

```ts
// Forward all headers
const headers = new Headers();
for (let i = 0; i < req.rawHeaders.length; i += 2) {
  const key = req.rawHeaders[i].toLowerCase();
  const value = req.rawHeaders[i + 1];
  headers.set(key, value);
}
```

With a native fetch `Request` object I can just do

```ts
for (const [key, value] of req.headers.entries()) {
  headers.set(key, value);
}
```

Is it possible to simplify it in Express as well?

### Add traffic monitoring info to the Pro CDN URL

I found this confusing because it seems our SDKs don't add tracking parameters to the agent download request just identification requests (unless I missed something). Is the intent to start tracking these?

I would also add something like: "Adding monitoring information to the requests will help the Fingerprint team monitor your integration and diagnose any potential issues."

### Configure cache durations

- I found this confusing and spent time examining the header of the incoming client request. It seems we switched from preparing the CDN request to preparing the client response. In between I would expect a snippet that actually makes the CDN request.

- The response from the CDN comes with the `cache-control: public, max-age=3590, s-maxage=606914`. Should I leave it alone or set it to `public, max-age=3600, s-maxage=60`? It's confusing because you say it should be as small as possible, yet the returned `s-maxage` is 60 much larger in the returned response than your recommended value.

- `headers.set('cache-control', 'public, max-age=3600, s-maxage=60'` this is missing a `)` and also implies that you can do something like `cdnResponse.headers.set('cache-control', 'public, max-age=3600, s-maxage=60')` but you can't because Response.headers is readonly (in Node). It seems you actually need to do this whole thing:

```ts
const updatedHeaders = new Headers(cdnResponse.headers);
updatedHeaders.set('cache-control', 'public, max-age=3600, s-maxage=60');

// Create a new Response object with the updated headers
const returnedResponse = new Response(cdnResponse.body, {
  status: cdnResponse.status,
  statusText: cdnResponse.statusText,
  headers: updatedHeaders,
});

return returnedResponse;
```

### Compression issue

I would give the reader a heads up about this. Like hey, it's possible your HTTP client decompresses the payload automatically and you send the decompressed payload to the client. You need to either disable that decompression or remove the `Content-Encoding` header to tell client the payload is not compressed.
