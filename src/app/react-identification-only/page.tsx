import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { ReactIdentificationDemo } from '../../components/ReactSdkDemo';

export default function ExamplePage() {
  return (
    <ReactIdentificationDemo
      loadOptions={{
        apiKey: 'eajUlf6axysf2z89ZVWx',
      }}
      getOptions={{
        extendedResult: true,
      }}
      name={'React identification only'}
    />
  );
}
