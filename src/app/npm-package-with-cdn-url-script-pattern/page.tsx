/* eslint-disable react/no-unescaped-entities */
import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { CUSTOM_SUBDOMAIN, REGION_SDK, SERVER_API_KEY } from '../../constants';

export default function ExamplePage() {
  return (
    <>
      <h2>This fails with "Unexpected token 'export'</h2>
      <NpmPackageIdentificationDemo
        loadOptions={{
          apiKey: '2UZgp3skqLzfJpFUGUrw',
          region: 'eu',
          endpoint: CUSTOM_SUBDOMAIN,
          // This fails with "Unexpected token 'export'""
          scriptUrlPattern: 'https://fp.jurajuhlar.eu/web/v3/<apiKey>',
        }}
        name={'JS Agent default (no products param)'}
        serverApiKey={SERVER_API_KEY}
      />
    </>
  );
}
