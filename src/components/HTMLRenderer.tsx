import fs from 'fs/promises';
import path from 'path';

export async function HTMLRenderer({ filePath }: { filePath: string }) {
  let htmlContent;
  console.log(filePath);
  try {
    htmlContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    htmlContent = '<p>Error loading HTML content.</p>';
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export function getCurrentDir(importMetaUrl: string) {
  return path.dirname(new URL(importMetaUrl).pathname);
}
