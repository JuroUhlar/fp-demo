import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { FunctionComponent } from 'react';

const SegmentPage: FunctionComponent = () => {
  const { isLoading, error, data, getData } = useVisitorData(
    {
      extendedResult: true,
      ignoreCache: true,
      linkedId: 'Next.js',
      tag: {
        integrations: {
          segment: {
            skipIntegration: false,
            identify: {
              userId: 'someUserId',
              traits: {
                name: 'Jon Doe',
                email: 'jondoe@example.com',
                plan: 'free',
                logins: 12,
                address: {
                  street: 'street1',
                  city: 'city1',
                  state: 'state1',
                },
              },
            },
            page: {
              category: 'Account',
              name: 'Update Password',
              context: {
                ip: '8.8.8.8',
                userAgent: 'Mozilla',
              },
              properties: {
                path: '/account/password',
                referrer: '/account/home',
                search: 'debug=true&testParam=123',
                title: 'Appify - Update Account Password',
                url: 'https://appify.dev/account/password',
                keywords: ['password', 'update', 'account', 'change'],
              },
            },
            track: {
              event: 'Plan Updated',
              properties: {
                revenue: '19.99',
                currency: 'USD',
                value: '19.99',
              },
            },
            group: {
              groupId: '0e8c78ea9d97a7b8185e8632',
              traits: {
                name: 'Fingerprint',
                industry: 'Tech',
                employees: 110,
                plan: 'enterprise',
                'total billed': 12000,
                website: 'fingerprint.com',
                address: {
                  city: 'New York',
                  country: 'USA',
                  postalCode: '32320',
                  state: 'New York',
                  street: '5th Ave',
                },
                avatar: 'https://fingerprint.com/favicon.ico',
                description: 'A Fingerprinting company',
                email: 'support@fingerprint.com',
                id: '0e8c78ea9d97a7b8185e8632',
              },
            },
          },
        },
      },
      products: ['botd', 'identification'],
    },
    { immediate: true }
  );
  return <div>{data?.visitorId}</div>;
};

export default SegmentPage;
