import Script from 'next/script';

export default function ExamplePage() {
  return (
    <>
      <Script id="123">
        {`
          // Initialize the agent on page load.
          const fpPromise = import('https://fp.jurajuhlar.eu/web/v3/2UZgp3skqLzfJpFUGUrw').then(
            (FingerprintJS) =>
              FingerprintJS.load({
                endpoint: ['https://fp.jurajuhlar.eu', FingerprintJS.defaultEndpoint],
              }),
          );
          
          // Get the visitorId when you need it.
          fpPromise
            .then((fp) => fp.get())
            .then((result) => {
              const visitorId = result.visitorId;
              console.log(visitorId);
            }); 
        `}
      </Script>
    </>
  );
}
