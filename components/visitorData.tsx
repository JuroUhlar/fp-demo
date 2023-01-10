import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { FunctionComponent } from "react";

const VisitorData: FunctionComponent = () => {
  const { isLoading, error, data, getData } = useVisitorData({
    extendedResult: true,
    // ignoreCache: true,
    linkedId: "next.js linked id",
    tag: { myTag: "FooBar" },
    products: ["botd", "identification"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (data) {
    console.log(data);
    // perform some logic based on the visitor data
    return (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => getData()}
        >
          Get data
        </button>
        <div>Welcome {data.visitorFound ? `back` : ""}!</div>
        <div>Your visitorId: {data.visitorId}</div>
        <div>Request Id: {data.requestId}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default VisitorData;
