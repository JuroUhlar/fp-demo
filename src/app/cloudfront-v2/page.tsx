import { JsAgentDebug } from '../../components/JsAgentDebug';

export default function ExamplePage() {
  return (
    <JsAgentDebug
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        region: 'eu',
        endpoint: 'https://dzwm15ps31ena.cloudfront.net/fpjs/result?region=eu',
        scriptUrlPattern:
          'https://dzwm15ps31ena.cloudfront.net/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'CloudFront V2'}
    />
  );
}
