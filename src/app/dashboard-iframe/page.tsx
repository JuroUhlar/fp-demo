'use client';

import { FunctionComponent } from 'react';

const DashboardIframe: FunctionComponent = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://dashboard.fingerprint.com"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Fingerprint Dashboard"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default DashboardIframe;
