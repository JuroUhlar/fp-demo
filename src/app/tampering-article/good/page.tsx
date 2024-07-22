import { HTMLRenderer, getCurrentDir } from '../../../components/HTMLRenderer';

export default function ExamplePage() {
  return <HTMLRenderer filePath={`${getCurrentDir(import.meta.url)}/index.html`} />;
}
