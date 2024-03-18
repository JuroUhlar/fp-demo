'use client';

import {
  FingerprintJSPro,
  useVisitorData,
  FpjsProvider,
  UseVisitorDataOptions,
} from '@fingerprintjs/fingerprintjs-pro-react';
import { FunctionComponent } from 'react';

export type JsAgentDemoProps = {
  name: string;
  getOptions?: FingerprintJSPro.GetOptions<boolean>;
  loadOptions: FingerprintJSPro.LoadOptions;
};

const VisitorData: FunctionComponent<JsAgentDemoProps> = ({ name, getOptions, loadOptions }) => {
  const usedGetOptions: UseVisitorDataOptions<boolean> = {
    linkedId: name,
    ignoreCache: true,
    ...getOptions,
  };

  const { data: visitorData, error, isLoading, getData } = useVisitorData(usedGetOptions);

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error' + error;
  }

  return (
    <>
      <h1>{name}</h1>
      <h2>React SDK load options</h2>
      <pre>{JSON.stringify(loadOptions, null, 2)}</pre>

      <h2>React SDK get options</h2>
      <pre>{JSON.stringify(usedGetOptions, null, 2)}</pre>

      <button onClick={() => getData()}>Get visitor data</button>
      {visitorData && <pre>{JSON.stringify(visitorData, null, 2)}</pre>}
    </>
  );
};

export const ReactIdentificationDemo = ({ name, getOptions, loadOptions }: JsAgentDemoProps) => {
  return (
    <FpjsProvider loadOptions={loadOptions}>
      <VisitorData name={name} getOptions={getOptions} loadOptions={loadOptions} />
    </FpjsProvider>
  );
};
