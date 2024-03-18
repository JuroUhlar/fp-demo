'use client';

import {
  FingerprintJSPro,
  useVisitorData,
  FpjsProvider,
} from '@fingerprintjs/fingerprintjs-pro-react';
import { FunctionComponent } from 'react';

export type JsAgentDemoProps = {
  name: string;
  getOptions?: FingerprintJSPro.GetOptions<boolean>;
};

type JsAgentDemoPropsWithProvider = JsAgentDemoProps & {
  loadOptions: FingerprintJSPro.LoadOptions;
};

const VisitorData: FunctionComponent<JsAgentDemoProps> = ({ name, getOptions }) => {
  const { data: visitorData, error, isLoading } = useVisitorData({ ...getOptions });

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error' + error;
  }

  return (
    <>
      <h1>{name}</h1>
      {visitorData && <pre>{JSON.stringify(visitorData, null, 2)}</pre>}
    </>
  );
};

export const ReactIdentificationDemo = ({
  name,
  getOptions,
  loadOptions,
}: JsAgentDemoPropsWithProvider) => {
  return (
    <FpjsProvider loadOptions={loadOptions}>
      <VisitorData name={name} getOptions={getOptions} />
    </FpjsProvider>
  );
};
