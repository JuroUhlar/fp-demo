import VisitorDataClient from './visitorDataClient';
import VisitorDataClientReactSDK from './visitorDataClientReactSDK';

export default async function ServerPage() {
  return (
    <>
      <main className="m-10">
        <div>
          <h1>This page was rendered server-side in the `app` directory</h1>
          <h1 className="text-3xl mb-4">Fingerprint Pro Demo</h1>
          <VisitorDataClient />
          {/* <VisitorDataClientReactSDK /> */}
          <div></div>
        </div>
      </main>
    </>
  );
}
