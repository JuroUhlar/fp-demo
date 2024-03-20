import { SpaDemo } from '../../components/SpaDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  return <SpaDemo {...SUBS.zeroTrustMode} name="SPA Package demo - Zero trust mode" />;
}
