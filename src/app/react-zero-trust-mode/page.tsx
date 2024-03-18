import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { ReactIdentificationDemo } from '../../components/ReactSdkDemo';

export default function ExamplePage() {
  return (
    <ReactIdentificationDemo
      loadOptions={{
        apiKey: 'v36mGCIF3h552liQAU4F',
      }}
      getOptions={{
        extendedResult: false,
      }}
      name={'Zero trust mode'}
    />
  );
}
