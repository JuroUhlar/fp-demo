import Link from 'next/link';

export default function ExamplePage() {
  return (
    <div>
      <h1>Link test</h1>
      <ul>
        <li>
          <a href="https://dev.fingerprint.com/docs/quick-start-guide">Live link</a>
        </li>
        <li>
          <a href="https://dev.fingerprint.com/docs/does-not-exist">Dead link</a>
        </li>
        <li>
          <a href="https://dev.fingerprint.com/docs/quick-start-guide#hash-does-not-exist">
            Live link but incorrect hash
          </a>
        </li>
        <li>
          <Link href="/agent">Live link but relative</Link>
        </li>
        <li>
          <Link href="/does not exist">Broken link but relative</Link>
        </li>
      </ul>
    </div>
  );
}
