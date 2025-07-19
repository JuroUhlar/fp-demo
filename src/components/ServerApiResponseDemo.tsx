import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { FunctionComponent } from 'react';
import { useServerApiEvent } from '../hooks/useEvent';
import { JsonViewer } from './JsonViewer';
import { GetEventPayload } from '../app/api/get-request/route';
import { TEST_IDS } from '../../tests/test_ids';

export const ServerApiResponseDemo: FunctionComponent<GetEventPayload> = (
  payload: GetEventPayload,
) => {
  const { identificationEvent, isPendingServerResponse, serverError } =
    useServerApiEvent(payload);

  if (isPendingServerResponse) {
    return <div>Loading Event from Server API...</div>;
  }

  if (serverError) {
    return <div>An error occurred: {serverError.message}</div>;
  }

  return (
    <JsonViewer
      data={identificationEvent}
      data_test_id={TEST_IDS.SERVER_API_RESPONSE}
    />
  );
};
