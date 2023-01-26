'use client';

import {
  FpjsProvider,
  useVisitorData,
} from '@fingerprintjs/fingerprintjs-pro-react';
import { ComponentType, FunctionComponent, PropsWithChildren } from 'react';
import {
  PUBLIC_API_KEY,
  REGION,
  CUSTOM_SUBDOMAIN,
} from '../../components/constants';

const WithFingerprintProReactPackage = (Component: ComponentType) => {
  const wrappedComponent = () => (
    <FpjsProvider
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        region: REGION,
        endpoint: CUSTOM_SUBDOMAIN,
      }}
    >
      <Component />
    </FpjsProvider>
  );
  return wrappedComponent;
};

const VisitorDataClientReactSDK: FunctionComponent = () => {
  const { data } = useVisitorData();
  console.log(data);
  return (
    <>
      <div>Your visitorId: {data?.visitorId}</div>
    </>
  );
};

export default WithFingerprintProReactPackage(VisitorDataClientReactSDK);
