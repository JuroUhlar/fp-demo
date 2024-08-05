import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
const host = 'juraj.click';

export default function ExamplePage() {
  return (
    <>
      <NpmPackageIdentificationDemo
        loadOptions={{
          apiKey: SUBS.identificationOnly.loadOptions.apiKey,
          endpoint: `https://${host}/fpjs/result?region=us`,
          scriptUrlPattern: `https://${host}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
        }}
        name={'Cloudfront Terraform Existing Distribution'}
      />
      <h3>
        Can also visit the main site at <a href={`https://${host}`}>{host}</a>
      </h3>
    </>
  );
}
