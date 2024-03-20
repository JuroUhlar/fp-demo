import { SpaDemo } from '../../components/SpaDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  return <SpaDemo {...SUBS.identificationOnly} name="SPA Package demo - Identification only" />;
}
