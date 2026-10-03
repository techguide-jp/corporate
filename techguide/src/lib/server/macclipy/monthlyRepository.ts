import {
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
export interface StoredDocument {
  value: unknown;
  etag: string;
}
export interface MonthlyRepository {
  get(key: string): Promise<StoredDocument | null>;
  put(key: string, value: unknown, etag: string | null): Promise<void>;
  list(prefix: string): Promise<unknown[]>;
}
export class DocumentConflict extends Error {}
function status(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null || !('$metadata' in error)) return undefined;
  return (error.$metadata as { httpStatusCode?: number } | undefined)?.httpStatusCode;
}
export function createS3Repository(bucket: string, region: string): MonthlyRepository {
  const client = new S3Client({ region });
  const keyPath = (key: string): string => `macclipy-monthly/${key}.json`;
  const repository: MonthlyRepository = {
    async get(key) {
      try {
        const result = await client.send(
          new GetObjectCommand({ Bucket: bucket, Key: keyPath(key) }),
        );
        const body = await result.Body?.transformToString();
        if (!body || !result.ETag) throw new Error('Invalid stored document');
        const value: unknown = JSON.parse(body);
        return { value, etag: result.ETag };
      } catch (error) {
        if (status(error) === 404) return null;
        throw error;
      }
    },
    async put(key, value, etag) {
      try {
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: keyPath(key),
            Body: JSON.stringify(value),
            ContentType: 'application/json',
            ServerSideEncryption: 'AES256',
            ...(etag ? { IfMatch: etag } : { IfNoneMatch: '*' }),
          }),
        );
      } catch (error) {
        if (status(error) === 412 || status(error) === 409) throw new DocumentConflict();
        throw error;
      }
    },
    async list(prefix) {
      const keys: string[] = [];
      let continuation: string | undefined;
      do {
        const result = await client.send(
          new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: `macclipy-monthly/${prefix}`,
            ContinuationToken: continuation,
          }),
        );
        keys.push(...(result.Contents ?? []).flatMap((item) => (item.Key ? [item.Key] : [])));
        if (keys.length > 10000)
          throw new Error('回答数が一覧の上限を超えています。分割して取得してください。');
        continuation = result.IsTruncated ? result.NextContinuationToken : undefined;
      } while (continuation);
      const values: unknown[] = [];
      for (let start = 0; start < keys.length; start += 8) {
        const batch = await Promise.all(
          keys.slice(start, start + 8).map(async (key) => {
            const result = await repository.get(
              key.replace(/^macclipy-monthly\//, '').replace(/\.json$/, ''),
            );
            if (!result) throw new Error('Missing response');
            return result.value;
          }),
        );
        values.push(...batch);
      }
      return values;
    },
  };
  return repository;
}
