import { FpjsProReactProviderServer } from './provider-server';
import { VisitorDataFpjsProReactClientDemo } from './visitor-data-client';

export default function FingerprintjsProReactDemoPage() {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">@fingerprintjs/fingerprintjs-pro-react Demo Page</h1>
      <p className="mb-6 text-gray-600">
        This page mirrors the @fingerprint/react test by placing the provider in a separate file with no{' '}
        <code>&apos;use client&apos;</code> directive.
      </p>

      <FpjsProReactProviderServer>
        <VisitorDataFpjsProReactClientDemo />
      </FpjsProReactProviderServer>
    </div>
  );
}
