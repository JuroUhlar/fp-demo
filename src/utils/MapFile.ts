import { promises as fs } from 'fs';
import path from 'path';

export class MapFile<K extends string, V> {
  private filename: string;

  constructor(filename: string) {
    console.log(filename);
    this.filename = path.resolve(filename);
  }

  private async readFile(): Promise<Record<K, V>> {
    try {
      const data = await fs.readFile(this.filename, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return {} as Record<K, V>;
      }
      throw error;
    }
  }

  private async writeFile(data: Record<K, V>): Promise<void> {
    console.log('writingFile');
    await fs.writeFile(this.filename, JSON.stringify(data, null, 2));
  }

  async set(key: K, value: V): Promise<void> {
    const data = await this.readFile();
    data[key] = value;
    await this.writeFile(data);
  }

  async get(key: K): Promise<V | undefined> {
    const data = await this.readFile();
    return data[key];
  }

  async has(key: K): Promise<boolean> {
    const data = await this.readFile();
    return key in data;
  }

  async delete(key: K): Promise<boolean> {
    const data = await this.readFile();
    const hasKey = key in data;
    if (hasKey) {
      delete data[key];
      await this.writeFile(data);
    }
    return hasKey;
  }

  async clear(): Promise<void> {
    await this.writeFile({} as Record<K, V>);
  }

  async *[Symbol.asyncIterator](): AsyncIterableIterator<[K, V]> {
    const data = await this.readFile();
    for (const [key, value] of Object.entries(data) as [K, V][]) {
      yield [key, value];
    }
  }

  async entries(): Promise<AsyncIterableIterator<[K, V]>> {
    return this[Symbol.asyncIterator]();
  }

  async keys(): Promise<K[]> {
    const data = await this.readFile();
    return Object.keys(data) as K[];
  }

  async values(): Promise<V[]> {
    const data = await this.readFile();
    return Object.values(data);
  }

  async size(): Promise<number> {
    const data = await this.readFile();
    return Object.keys(data).length;
  }
}
