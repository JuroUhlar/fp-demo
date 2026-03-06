import fs from 'fs';
import Link from 'next/link';
import path from 'path';
import VisitorData from '../components/visitorData';
import { MyFpjsProvider } from '../components/FpjsProvider';

function getAllFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      fileList = getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function getPublicHtmlDemos(publicDir: string): { href: string; label: string }[] {
  const files = getAllFiles(publicDir).filter((f) => f.endsWith('.html'));
  return files.map((filePath) => {
    const relative = path.relative(publicDir, filePath).replaceAll(path.sep, '/');
    const href = '/' + relative;
    const label = relative.endsWith('/index.html') || relative === 'index.html'
      ? path.dirname(relative) === '.' ? 'index' : path.dirname(relative)
      : relative;
    return { href, label };
  });
}

const appPath = 'src/app/';
const publicPath = 'public';

export default function Index() {
  const files = getAllFiles(appPath);
  const pages = files
    .filter((file) => file.endsWith('page.tsx'))
    .map((file) => file.replace(appPath, ''))
    .map((file) => file.replace('page.tsx', ''));

  const publicDemos = getPublicHtmlDemos(publicPath);

  return (
    <>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <Link href={`/${page}`}>{page}</Link>
          </li>
        ))}
      </ul>

      {publicDemos.length > 0 && (
        <>
          <h2>Public HTML demos</h2>
          <ul>
            {publicDemos.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      <MyFpjsProvider>
        <VisitorData />
      </MyFpjsProvider>
    </>
  );
}
