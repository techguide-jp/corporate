const rawToken = new URLSearchParams(window.location.hash.slice(1)).get('token') ?? '';
const bootstrap = {
  token: /^[a-f0-9]{64}$/.test(rawToken) ? rawToken : '',
  invalidToken: Boolean(rawToken) && !/^[a-f0-9]{64}$/.test(rawToken),
  testMode: new URLSearchParams(window.location.search).get('mode') === 'test',
};
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}
(() => {
  'use strict';
  let session = null;
  let profile = null;
  let fields = [];
  let busy = false;
  const byId = (id) => document.getElementById(id);
  const show = (view, step) => {
    ['request', 'verify', 'details', 'complete'].forEach((id) => {
      byId(id + '-view').hidden = id !== view;
    });
    document.querySelectorAll('[data-step]').forEach((item) => {
      item.classList.toggle('active', Number(item.dataset.step) === step);
    });
    window.scrollTo(0, 0);
  };
  const status = (id, message, error) => {
    const node = byId(id);
    node.textContent = message;
    node.className = 'status ' + (error ? 'error' : 'success');
  };
  async function call(action, ...args) {
    const response = await fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      mode: 'same-origin',
      body: JSON.stringify({ action, args }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.ok !== true) {
      throw new Error(data?.message ?? '接続できませんでした。時間をおいてお試しください。');
    }
    return data.result;
  }
  const message = (error) =>
    error && error.message
      ? String(error.message).replace(/^Exception:\s*/, '')
      : '接続できませんでした。時間をおいてお試しください。';
  const pending = (button, active, label) => {
    button.disabled = active;
    button.setAttribute('aria-busy', String(active));
    button.textContent = label;
  };
  byId('request-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    busy = true;
    const button = byId('request-button');
    pending(button, true, '送信中...');
    status('request-status', '', false);
    try {
      const result = await call(
        'requestVerification',
        byId('email').value,
        byId('website').value,
        !!bootstrap.testMode,
      );
      status(
        'request-status',
        result.message +
          '\n見当たらない場合は迷惑メールをご確認ください。再送は5分以上あけてください。',
        false,
      );
      button.textContent = '確認メールを再送する';
    } catch (error) {
      status('request-status', message(error), true);
    } finally {
      pending(
        button,
        false,
        button.textContent === '送信中...' ? '確認メールを送る' : button.textContent,
      );
      busy = false;
    }
  });
  byId('restart-button').addEventListener('click', () => {
    if (!busy) {
      bootstrap.token = '';
      show('request', 1);
    }
  });
  async function verify(token, button) {
    if (busy) return;
    busy = true;
    pending(button, true, '確認中...');
    status('verify-status', '', false);
    try {
      const result = await call('verifyIdentity', token);
      session = result.sessionToken;
      bootstrap.token = '';
      profile = result.profile;
      fields = result.fields;
      byId('verified-email').textContent = result.email;
      byId('test-badge').hidden = !result.testMode;
      if (!result.found)
        byId('profile-intro').textContent =
          '以前の情報が見つかりませんでした。お名前と、共有しておきたい情報を入力してください。';
      renderFields();
      renderChoices('experience-options', 'experience', result.experiences, 'radio');
      renderChoices('future-goal-options', 'future-goal', result.futureGoals);
      renderChoices('concern-options', 'concern', result.concerns);
      renderChoices(
        'partner-interest-options',
        'partner-interest',
        result.partnerInterests,
        'radio',
      );
      show('details', 2);
    } catch (error) {
      status('verify-status', message(error), true);
    } finally {
      pending(button, false, '本人確認して進む');
      busy = false;
    }
  }
  byId('verify-button').addEventListener('click', (event) => {
    verify(bootstrap.token, event.currentTarget);
  });
  function renderFields() {
    const container = byId('profile-fields');
    container.replaceChildren();
    fields.forEach((field) => {
      const section = document.createElement('div');
      section.className = 'profile-field';
      const top = document.createElement('div');
      top.className = 'field-top';
      const label = document.createElement('label');
      label.htmlFor = 'edit-' + field.key;
      label.textContent = field.label;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'secondary';
      button.textContent = profile[field.key] ? '変更する' : '追加する';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', field.label + 'を変更する');
      const preview = document.createElement('p');
      preview.className = 'preview' + (profile[field.key] ? '' : ' empty');
      preview.textContent = profile[field.key] || '未登録';
      const editor = document.createElement('div');
      editor.className = 'editor';
      editor.hidden = !!profile[field.key];
      const textarea = document.createElement('textarea');
      textarea.id = 'edit-' + field.key;
      textarea.maxLength = field.max;
      textarea.value = profile[field.key];
      textarea.rows = field.key === 'name' || field.key === 'company' ? 2 : 4;
      if (field.key === 'name') textarea.required = true;
      const changed = document.createElement('span');
      changed.className = 'changed';
      changed.hidden = true;
      changed.textContent = '変更あり';
      textarea.addEventListener('input', () => {
        changed.hidden = textarea.value.trim() === profile[field.key];
        preview.textContent = textarea.value || '未登録';
      });
      button.addEventListener('click', () => {
        editor.hidden = !editor.hidden;
        preview.hidden = !editor.hidden;
        button.textContent = editor.hidden ? (textarea.value ? '変更する' : '追加する') : '閉じる';
        button.setAttribute('aria-expanded', String(!editor.hidden));
        if (!editor.hidden) textarea.focus();
      });
      if (!editor.hidden) {
        preview.hidden = true;
        button.textContent = '閉じる';
        button.setAttribute('aria-expanded', 'true');
      }
      top.append(label, changed, button);
      editor.append(textarea);
      section.append(top, preview, editor);
      container.append(section);
    });
  }
  function renderChoices(containerId, name, choices, type = 'checkbox') {
    const container = byId(containerId);
    const required = container.getAttribute('aria-required') === 'true';
    container.replaceChildren();
    choices.forEach((value) => {
      const label = document.createElement('label');
      label.className = 'choice';
      const input = document.createElement('input');
      input.type = type;
      input.name = name;
      input.required = required;
      input.value = value;
      const text = document.createElement('span');
      text.textContent = value;
      label.append(input, text);
      container.append(label);
    });
  }
  byId('details-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || !session) return;
    const selections = new FormData(event.currentTarget);
    const updated = {};
    fields.forEach((field) => {
      updated[field.key] = byId('edit-' + field.key).value;
    });
    if (!updated.name.trim()) {
      status('submit-status', 'お名前を入力してください。', true);
      const editor = byId('edit-name');
      editor.parentElement.hidden = false;
      editor.scrollIntoView({ block: 'center' });
      editor.focus();
      return;
    }
    busy = true;
    const button = byId('submit-button');
    pending(button, true, '保存中...');
    status('submit-status', '', false);
    document
      .querySelectorAll('#details-form textarea, #details-form input, #details-form button')
      .forEach((node) => {
        node.disabled = true;
      });
    try {
      const result = await call('submitIntake', session, {
        profile: updated,
        experience: selections.get('experience'),
        futureGoals: selections.getAll('future-goal'),
        concerns: selections.getAll('concern'),
        partnerInterest: selections.get('partner-interest'),
        note: selections.get('note'),
      });
      if (
        !result.saved ||
        result.timerex !== 'https://timerex.net/s/y.takahashi_e223_eafa/38aacdf8'
      )
        throw new Error('受付結果を確認できませんでした。');
      session = null;
      profile = null;
      byId('profile-fields').replaceChildren();
      byId('note').value = '';
      byId('booking-link').href = result.timerex;
      byId('mail-result').textContent = result.mailSent
        ? '同じ予約リンクをメールでもお送りしました。'
        : '回答は保存されました。予約案内メールの送信結果は確認できていません。上のボタンからご予約ください。';
      byId('response-id').textContent = '受付番号：' + result.responseId;
      show('complete', 3);
    } catch (error) {
      status('submit-status', message(error), true);
    } finally {
      document
        .querySelectorAll('#details-form textarea, #details-form input, #details-form button')
        .forEach((node) => {
          node.disabled = false;
        });
      pending(button, false, '回答を送信する');
      busy = false;
    }
  });
  if (bootstrap.token) show('verify', 1);
  else if (bootstrap.invalidToken)
    status('request-status', '確認リンクが無効です。確認メールを再度お送りください。', true);
})();
