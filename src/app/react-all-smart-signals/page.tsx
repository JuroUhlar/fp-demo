import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { ReactIdentificationDemo } from '../../components/ReactSdkDemo';

export default function ExamplePage() {
  return (
    <ReactIdentificationDemo
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
      }}
      getOptions={{
        extendedResult: true,
        timeout: 1,
      }}
      name={'React SDK All smart signals'}
    />
  );
}
