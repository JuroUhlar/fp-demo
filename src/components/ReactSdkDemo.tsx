'use client';

import {
  useVisitorData,
  FingerprintProvider,
  UseVisitorDataOptions,
} from '@fingerprint/react';
import { FunctionComponent } from 'react';

export type JsAgentDemoProps = {
  name: string;
  getOptions?: Omit<UseVisitorDataOptions, 'linkedId'>;
  loadOptions: {
    apiKey: string;
    endpoints?: string[];
  };
};

const VisitorData: FunctionComponent<JsAgentDemoProps> = ({ name, getOptions, loadOptions }) => {
  const usedGetOptions: UseVisitorDataOptions = {
    linkedId: name,
    immediate: getOptions?.immediate ?? true,
    ...(getOptions?.timeout !== undefined && { timeout: getOptions.timeout }),
    ...(getOptions?.tag !== undefined && { tag: getOptions.tag }),
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
    <FingerprintProvider apiKey={loadOptions.apiKey} endpoints={loadOptions.endpoints}>
      <VisitorData name={name} getOptions={getOptions} loadOptions={loadOptions} />
    </FingerprintProvider>
  );
};
