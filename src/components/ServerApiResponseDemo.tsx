import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { FunctionComponent } from 'react';
import { UseEventOptions, useServerApiEvent } from '../hooks/useEvent';
import { JsonViewer } from './jsonViewer';

export const ServerApiResponseDemo: FunctionComponent<UseEventOptions> = ({
  requestId,
  apiKey,
  region,
}) => {
  const { identificationEvent, isPendingServerResponse, serverError } = useServerApiEvent({
    requestId,
    apiKey,
    region,
  });

  if (isPendingServerResponse) {
    return <div>Loading Event from Server API...</div>;
  }

  if (serverError) {
    return <div>An error occurred: {serverError.message}</div>;
  }

  return <JsonViewer data={identificationEvent} />;
};
