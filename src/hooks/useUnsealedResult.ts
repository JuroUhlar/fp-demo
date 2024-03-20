import { useQuery } from '@tanstack/react-query';

export const useUnsealedResult = (sealedResult?: string) => {
  return useQuery({
    queryKey: ['event', sealedResult],
    queryFn: async () => {
      return fetch('/api/decrypt', {
        method: 'POST',
        body: JSON.stringify({ sealedResult }),
      }).then((res) => res.json());
    },
    enabled: Boolean(sealedResult),
  });
};
