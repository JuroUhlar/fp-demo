import { FingerprintReactProviderServer } from './provider-server';
import { VisitorDataReactClientDemo } from './visitor-data-client';

export default function ReactDemoPage() {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">@fingerprint/react Demo Page</h1>
      <p className="mb-6 text-gray-600">
        This page demonstrates the @fingerprint/react SDK with automatic identification, manual re-identification, and
        state management hooks.
      </p>

      <FingerprintReactProviderServer>
        <VisitorDataReactClientDemo />
      </FingerprintReactProviderServer>
    </div>
  );
}
