'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { PUBLIC_API_KEY } from '../../constants';

type RequestState = 'loading' | 'success' | 'error' | null;

const ProxyPlayground: FunctionComponent = ({}) => {
  const [agentDefault, setAgentDefault] = useState<RequestState>(null);
  const [resultDefault, setResultDefault] = useState<RequestState>(null);
  const [visitorIdDefault, setVisitorIdDefault] = useState<string | null>(null);

  useEffect(() => {
    const tryDefault = async () => {
      // Initialize an agent at application startup.
      const fpAgent = await FingerprintJS.load({ apiKey: PUBLIC_API_KEY });
      if (fpAgent) {
        setAgentDefault('success');
        const result = await fpAgent.get();
        if (result) {
          setResultDefault('success');
          setVisitorIdDefault(result.visitorId);
        } else {
          setResultDefault('error');
        }
      } else {
        setAgentDefault('error');
        setResultDefault('error');
      }
    };

    tryDefault();
  }, []);

  return (
    <div>
      <h1>Default</h1>
      <div>Agent: {agentDefault}</div>
      <div>Result: {resultDefault}</div>
      <div>VisitorId: {visitorIdDefault}</div>
    </div>
  );
};

export default ProxyPlayground;
