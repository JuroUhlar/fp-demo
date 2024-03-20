import { SpaDemo } from '../../components/SpaDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  return <SpaDemo {...SUBS.main} name="SPA Package demo All Smart signals" />;
}
