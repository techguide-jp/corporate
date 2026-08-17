import assert from 'node:assert/strict';
import test from 'node:test';
import { GET } from './+server.ts';

interface RedirectResult {
  status: number;
  location: string;
}

function assertRedirect(url: string, expectedLocation: string) {
  assert.throws(
    () => GET({ url: new URL(url) } as never),
    (error: unknown) => {
      const result = error as RedirectResult;

      assert.equal(result.status, 302);
      assert.equal(result.location, expectedLocation);
      return true;
    },
  );
}

await test('redirects a known legacy event to its destination', () => {
  assertRedirect(
    'https://techguide.jp/redirects?event=20230522_talk_seminar',
    'https://forms.gle/3TUbGDBYAHLrJBiq9',
  );
});

await test('redirects missing and unknown events to the home page', () => {
  assertRedirect('https://techguide.jp/redirects', '/');
  assertRedirect('https://techguide.jp/redirects?event=unknown', '/');
});
