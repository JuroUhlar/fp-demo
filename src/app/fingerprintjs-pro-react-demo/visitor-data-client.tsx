'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { JsonViewer } from '../../components/JsonViewer';

export function VisitorDataFpjsProReactClientDemo() {
  const { data, isLoading, error, getData } = useVisitorData(
    {
      linkedId: 'fingerprintjs-pro-react-demo-page',
    },
    {
      immediate: true,
    }
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-xl font-semibold">@fingerprintjs/fingerprintjs-pro-react Demo</h2>

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-medium">Status</h3>
          <div className="flex items-center gap-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                isLoading
                  ? 'bg-yellow-100 text-yellow-800'
                  : data
                    ? 'bg-green-100 text-green-800'
                    : error
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
              }`}
            >
              {isLoading ? 'Loading...' : data ? 'Success' : error ? 'Error' : 'Idle'}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={() => getData()}
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Getting Data...' : 'Get Visitor Data'}
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
            <h3 className="mb-2 font-medium">Error</h3>
            <pre className="overflow-auto text-sm">{error.message}</pre>
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-medium">Visitor ID</h3>
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">{data.visitorId}</code>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Request ID</h3>
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">{data.requestId}</code>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Full Response</h3>
              <JsonViewer data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
