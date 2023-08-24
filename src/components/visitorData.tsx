import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { FunctionComponent, useEffect, useState } from 'react';

const VisitorData: FunctionComponent<{ disableBotDetection?: boolean }> = ({
  disableBotDetection,
}) => {
  const { isLoading, error, data, getData } = useVisitorData({
    extendedResult: true,
    ignoreCache: true,
    linkedId: 'Next.js',
    tag: { integration: 'Next.js' },
    products: disableBotDetection ? ['identification'] : ['botd'],
  });

  const [eventData, setEventData] = useState<any>({});

  useEffect(() => {
    if (!data?.requestId) {
      return;
    }
    console.log('JS Agent response: ', data);

    fetch('/api/getRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestId: data?.requestId }),
    })
      .then((res) => res.json())
      .then((eventData) => {
        console.log('Server API Event Response: ', eventData.products);
        setEventData(eventData);
      });
  }, [data]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => getData({ ignoreCache: true })}
      >
        Get data
      </button>
      {isLoading && <span> Loading...</span>}
      {error && <span>An error occurred: {error.message}</span>}
      <div>Welcome{data?.visitorFound ? ` back` : ''}!</div>
      <div>
        Your visitorId: <code> {data?.visitorId}</code>
      </div>
      <div>
        Request Id: <code> {data?.requestId}</code>
      </div>
      {data && (
        <div>
          You are a{' '}
          {data.visitorId === '' ? (
            <>
              stinky robot made of code <b className="text-3xl">🤖</b>
            </>
          ) : (
            <>
              nice human made of meat <b className="text-3xl">🥩</b>
            </>
          )}
          <div className="flex flex-col md:flex-row mt-4 justify-between ">
            <div>
              <h2 className="font-bold m-4">JS Agent response</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            <div>
              <h2 className="font-bold m-4">Server API Event response</h2>
              <pre>{JSON.stringify(eventData, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorData;
