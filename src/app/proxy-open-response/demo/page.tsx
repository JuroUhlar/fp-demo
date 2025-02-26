'use client';

import { FunctionComponent } from 'react';

import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS } from '../../../constants';

const CustomProxyDemo: FunctionComponent = ({}) => {
  return (
    <div>
      <ul>
        <li>
          See implementation{' '}
          <a href="https://github.com/JuroUhlar/fp-demo/tree/main/src/app/proxy/result-open-response">
            on GitHub
          </a>
        </li>
        <li>
          Examine the identification response using DevTools to see the unsealed
          response
        </li>
      </ul>
      <NpmPackageIdentificationDemo
        name="Open Response Custom Proxy"
        loadOptions={{
          apiKey: SUBS.openResponse.loadOptions.apiKey,
          endpoint: SUBS.openResponse.loadOptions.endpoint,
          region: SUBS.openResponse.loadOptions.region,
          scriptUrlPattern: SUBS.openResponse.loadOptions.scriptUrlPattern,
        }}
      />
    </div>
  );
};

export default CustomProxyDemo;
