import { useQuery } from '@tanstack/react-query';

const DECRYPT_V4_ENDPOINT = '/api/decrypt-v4';

export const useUnsealedResult = (
  sealedResult?: string,
  endpoint = DECRYPT_V4_ENDPOINT,
) => {
  return useQuery({
    queryKey: ['event', sealedResult, endpoint],
    queryFn: async () => {
      return fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ sealedResult }),
      }).then((res) => res.json());
    },
    enabled: Boolean(sealedResult),
  });
};
