import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { FunctionComponent } from 'react';

const VisitorData: FunctionComponent = () => {
  const { isLoading, error, data, getData } = useVisitorData({
    extendedResult: true,
    // ignoreCache: true,
    linkedId: 'Next.js',
    tag: { integration: 'Next.js' },
    products: ['botd', 'identification'],
  });

  if (data && !isLoading) {
    console.log(data);
  }
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
      <div>Your visitorId: {data?.visitorId}</div>
      <div>Request Id: {data?.requestId}</div>
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
        </div>
      )}
    </div>
  );
};

export default VisitorData;
