import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, readdir, writeFile, unlink } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { DocumentConflict, type MonthlyRepository } from './monthlyRepository.ts';
export function createLocalRepository(directory: string): MonthlyRepository {
  const path = (key: string): string => join(directory, `${key}.json`);
  const repository: MonthlyRepository = {
    async get(key) {
      try {
        const body = await readFile(path(key), 'utf8');
        const value: unknown = JSON.parse(body);
        return { value, etag: createHash('sha256').update(body).digest('hex') };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
        throw error;
      }
    },
    async put(key, value, etag) {
      const file = path(key);
      await mkdir(dirname(file), { recursive: true });
      const lock = `${file}.lock`;
      try {
        await writeFile(lock, '', { flag: 'wx' });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'EEXIST') throw new DocumentConflict();
        throw error;
      }
      try {
        const current = await repository.get(key);
        if ((current?.etag ?? null) !== etag) throw new DocumentConflict();
        await writeFile(`${file}.pending`, JSON.stringify(value));
        await rename(`${file}.pending`, file);
      } finally {
        await unlink(lock);
      }
    },
    async list(prefix) {
      let files: string[];
      try {
        files = await readdir(join(directory, prefix));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
        throw error;
      }
      const values: unknown[] = [];
      for (const file of files.filter((file) => file.endsWith('.json'))) {
        const document = await repository.get(`${prefix}/${file.slice(0, -5)}`);
        if (document) values.push(document.value);
      }
      return values;
    },
  };
  return repository;
}
