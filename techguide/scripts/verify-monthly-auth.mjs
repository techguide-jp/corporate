import assert from 'node:assert/strict';

const base = new URL(process.env.MACCLIPY_VERIFY_URL || 'http://127.0.0.1:5187');
if (!['127.0.0.1', 'localhost'].includes(base.hostname)) {
  throw new Error('この検証はローカル開発環境専用です。');
}
const password = process.env.MACCLIPY_VERIFY_PASSWORD;
if (!password) throw new Error('MACCLIPY_VERIFY_PASSWORDを指定してください。');

const unauthenticated = await fetch(new URL('/macclipy/admin/', base), { redirect: 'manual' });
assert.equal(unauthenticated.status, 303);
assert.equal(unauthenticated.headers.get('location'), '/macclipy/admin/login/');
const csv = await fetch(new URL('/macclipy/admin/responses.csv', base));
assert.equal(csv.status, 401);
const invalidForm = await fetch(new URL('/macclipy/admin/login/', base), {
  method: 'POST',
  headers: {
    origin: base.origin,
    'x-sveltekit-action': 'true',
    'content-type': 'multipart/form-data; boundary=invalid-test-boundary',
  },
  body: 'not a multipart form',
});
assert.equal((await invalidForm.json()).status, 400);
const wrongPassword = await fetch(new URL('/macclipy/admin/login/', base), {
  method: 'POST',
  headers: { origin: base.origin, 'x-sveltekit-action': 'true' },
  body: new URLSearchParams({ password: `${password}-incorrect` }),
});
assert.equal((await wrongPassword.json()).status, 401);
const multipart = new FormData();
multipart.set('password', password);
const enhancedLogin = await fetch(new URL('/macclipy/admin/login/', base), {
  method: 'POST',
  headers: { origin: base.origin, 'x-sveltekit-action': 'true' },
  body: multipart,
});
assert.equal((await enhancedLogin.json()).type, 'redirect');
const login = await fetch(new URL('/macclipy/admin/login/', base), {
  method: 'POST',
  headers: { origin: base.origin, 'x-sveltekit-action': 'true' },
  body: new URLSearchParams({ password }),
});
const result = await login.json();
assert.equal(result.type, 'redirect');
const setCookie = login.headers.get('set-cookie');
assert.ok(setCookie?.includes('HttpOnly'));
assert.ok(setCookie?.includes('SameSite=Strict'));
const cookie = setCookie.split(';')[0];
const admin = await fetch(new URL('/macclipy/admin/', base), {
  headers: { cookie },
  redirect: 'manual',
});
assert.equal(admin.status, 200);
assert.ok((await admin.text()).includes('月次配信とアンケート'));
const logout = await fetch(new URL('/macclipy/admin/?/logout', base), {
  method: 'POST',
  headers: { cookie, origin: base.origin, 'x-sveltekit-action': 'true' },
  body: new URLSearchParams(),
});
assert.ok(logout.headers.get('set-cookie')?.includes('Max-Age=0'));
console.log(
  '管理画面・CSVの未認証拒否、フォーム不正・パスワード不一致の区別、通常・multipartログイン、ログイン後の表示、ログアウトを確認しました。',
);
