import { EventsGetResponse } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { useQuery } from '@tanstack/react-query';
import {
  EventV4Response,
  GetEventPayloadV4,
} from '../app/api/get-request-v4/route';
import { GetEventPayload } from '../app/api/get-request/route';

export const useServerApiEvent = (payload: GetEventPayload) => {
  const {
    data: identificationEvent,
    isLoading: isLoadingServerResponse,
    error: serverError,
  } = useQuery<EventsGetResponse | undefined>({
    queryKey: ['event', payload.requestId],
    queryFn: () =>
      fetch(`/api/get-request`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.statusText}`);
        }
        return res.json();
      }),
    enabled: Boolean(payload.requestId),
    retry: false,
  });

  return {
    identificationEvent,
    isPendingServerResponse: isLoadingServerResponse,
    serverError,
  };
};

export const useServerApiEventV4 = (payload: GetEventPayloadV4) => {
  const {
    data: event,
    isLoading: isPendingServerResponse,
    error: serverError,
  } = useQuery<EventV4Response | undefined>({
    queryKey: ['event-v4', payload.eventId],
    queryFn: () =>
      fetch(`/api/get-request-v4`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      }),
    enabled: Boolean(payload.eventId),
    retry: false,
  });

  return {
    event,
    isPendingServerResponse,
    serverError,
  };
};
