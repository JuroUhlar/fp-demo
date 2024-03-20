import { SpaDemo } from '../../components/SpaDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  return <SpaDemo {...SUBS.sealedResults} name="SPA Package demo - Sealed results" />;
}
