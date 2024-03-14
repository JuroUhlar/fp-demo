export default async function ServerPage() {
  let data: any = null;

  // This is an antipattern that will break server-side rendering
  // const fpPromise = FingerprintJS.load({
  //   apiKey: PUBLIC_API_KEY,
  //   endpoint: CUSTOM_SUBDOMAIN,
  // });
  // const fp = await fpPromise;
  //  data = await fp.get({ extendedResult: true });
  // console.log(data);
  return (
    <>
      <main className="m-10">
        <div>
          <h1>This page was rendered server-side in the `app` directory</h1>
          <h1 className="text-3xl mb-4">Fingerprint Pro Demo</h1>
          <div>Your visitorId: {data?.visitorId}</div>
          <div></div>
        </div>
      </main>
    </>
  );
}
