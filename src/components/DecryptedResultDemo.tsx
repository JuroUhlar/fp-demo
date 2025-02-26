import { FunctionComponent } from 'react';
import { JsonViewer } from './JsonViewer';
import { useUnsealedResult } from '../hooks/useUnsealedResult';

export const UnsealedResultDemo: FunctionComponent<{
  sealedResult: string;
}> = ({ sealedResult }) => {
  const { data, isLoading, error } = useUnsealedResult(sealedResult);

  if (isLoading) {
    return <div>Unsealing result...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return <JsonViewer data={data} />;
};
