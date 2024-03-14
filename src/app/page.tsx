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

function convertCamelToNormal(camelCaseString: string) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

const appPath = 'src/app/';

export default function Index() {
  const files = getAllFiles(appPath);
  const pages = files
    .filter((file) => file.endsWith('page.tsx'))
    .map((file) => file.replace(appPath, ''))
    .map((file) => file.replace('page.tsx', ''));

  // .map((file) => convertCamelToNormal(file))
  // .map((file) => file.replace('-', ' '));

  console.log(pages);

  return (
    <>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <Link href={`/${page}`}>{page}</Link>
          </li>
        ))}
      </ul>

      <MyFpjsProvider>
        <VisitorData />
      </MyFpjsProvider>
    </>
  );
}
