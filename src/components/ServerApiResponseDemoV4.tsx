import { FunctionComponent } from 'react';
import { useServerApiEventV4 } from '../hooks/useEvent';
import { JsonViewer } from './JsonViewer';
import { GetEventPayloadV4 } from '../app/api/get-request-v4/route';
import { TEST_IDS } from '../../tests/test_ids';

export const ServerApiResponseDemoV4: FunctionComponent<GetEventPayloadV4> = (
  payload: GetEventPayloadV4,
) => {
  const { event, isPendingServerResponse, serverError } =
    useServerApiEventV4(payload);

  if (isPendingServerResponse) {
    return <div>Loading Event from Server API v4...</div>;
  }

  if (serverError) {
    return <div>An error occurred: {serverError.message}</div>;
  }

  return (
    <JsonViewer
      data={event}
      data_test_id={TEST_IDS.SERVER_API_RESPONSE}
    />
  );
};
