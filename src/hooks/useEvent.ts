import { EventResponse, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export type UseEventOptions = {
  requestId?: string;
  apiKey: string;
  region?: Region;
};

export const useServerApiEvent = ({
  requestId,
  apiKey,
  region = Region.Global,
}: UseEventOptions) => {
  const {
    data: identificationEvent,
    isLoading: isLoadingServerResponse,
    error: serverError,
  } = useQuery<EventResponse | undefined>({
    queryKey: ['event', requestId],
    queryFn: () =>
      fetch(`/api/getRequest`, {
        method: 'POST',
        body: JSON.stringify({ requestId, apiKey, region }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.statusText}`);
        }
        return res.json();
      }),
    enabled: Boolean(requestId),
    retry: false,
  });

  return {
    identificationEvent,
    isPendingServerResponse: isLoadingServerResponse,
    serverError,
  };
};
