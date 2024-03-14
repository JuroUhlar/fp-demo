'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

export default function FingerprintComponent() {
  const { data, error, isLoading } = useVisitorData({ extendedResult: false });

  if (isLoading) {
    console.log('Loading');
    return 'Loading';
  }

  if (error) {
    console.log(error);
    return 'Error';
  }

  if (data) {
    console.log('data');
    return JSON.stringify(data, null, 2);
  }

  console.log(null);
  return 'null';
}
