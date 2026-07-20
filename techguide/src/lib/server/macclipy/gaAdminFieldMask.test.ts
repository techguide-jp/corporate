import assert from 'node:assert/strict';
import test from 'node:test';
import { createUpdateMask } from '../../../../scripts/ga-admin-field-mask.mjs';

await test('GA Admin API用のFieldMaskをpaths配列で生成する', () => {
  assert.deepEqual(createUpdateMask('display_name', 'description'), {
    paths: ['display_name', 'description'],
  });
});
