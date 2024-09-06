'use client';

import { FunctionComponent } from 'react';

import { NpmPackageIdentificationDemo } from '../../../../components/JsAgentNpmDemo';
import { SUBS } from '../../../../constants';

const CustomProxyDemo: FunctionComponent = ({}) => {
  return (
    <div>
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
