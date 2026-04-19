import { AnalyticsAdminServiceClient, protos } from '@google-analytics/admin';

const { KeyEvent, CustomDimension } = protos.google.analytics.admin.v1beta;

const DEFAULT_KEY_EVENTS = [
  {
    eventName: 'contact_page_view',
    countingMethod: KeyEvent.CountingMethod.ONCE_PER_EVENT,
  },
];

const DEFAULT_CUSTOM_DIMENSIONS = [
  {
    parameterName: 'placement',
    displayName: 'Placement',
    description: 'お問い合わせ CTA の配置',
    scope: CustomDimension.DimensionScope.EVENT,
  },
  {
    parameterName: 'section',
    displayName: 'Section',
    description: '外部リンクがクリックされたセクション',
    scope: CustomDimension.DimensionScope.EVENT,
  },
  {
    parameterName: 'link_label',
    displayName: 'Link label',
    description: 'クリックされたリンクラベル',
    scope: CustomDimension.DimensionScope.EVENT,
  },
  {
    parameterName: 'destination_host',
    displayName: 'Destination host',
    description: 'クリック先のホスト名',
    scope: CustomDimension.DimensionScope.EVENT,
  },
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function getPropertyName() {
  const rawValue = process.env.GA4_PROPERTY_ID?.trim();

  if (!rawValue) {
    fail('GA4_PROPERTY_ID を .env に設定してください。例: GA4_PROPERTY_ID=123456789');
  }

  return rawValue.startsWith('properties/') ? rawValue : `properties/${rawValue}`;
}

function getClient() {
  return new AnalyticsAdminServiceClient();
}

async function listKeyEvents(client, parent) {
  const [items] = await client.listKeyEvents({ parent });
  return items;
}

async function listCustomDimensions(client, parent) {
  const [items] = await client.listCustomDimensions({ parent });
  return items;
}

function printKeyEvents(items) {
  if (items.length === 0) {
    console.log('Key event: なし');
    return;
  }

  console.log('Key events:');
  for (const item of items) {
    console.log(
      `- ${item.eventName} (countingMethod=${item.countingMethod ?? 'UNKNOWN'}, custom=${item.custom ?? false})`,
    );
  }
}

function printCustomDimensions(items) {
  if (items.length === 0) {
    console.log('Custom dimensions: なし');
    return;
  }

  console.log('Custom dimensions:');
  for (const item of items) {
    console.log(
      `- ${item.parameterName} (displayName=${item.displayName}, scope=${item.scope ?? 'UNKNOWN'})`,
    );
  }
}

async function ensureKeyEvents(client, parent, dryRun) {
  const existingItems = await listKeyEvents(client, parent);
  const byEventName = new Map(existingItems.map((item) => [item.eventName, item]));

  for (const desired of DEFAULT_KEY_EVENTS) {
    const existing = byEventName.get(desired.eventName);

    if (!existing) {
      if (dryRun) {
        console.log(`[dry-run] create key event: ${desired.eventName}`);
      } else {
        await client.createKeyEvent({
          parent,
          keyEvent: {
            eventName: desired.eventName,
            countingMethod: desired.countingMethod,
          },
        });
        console.log(`created key event: ${desired.eventName}`);
      }
      continue;
    }

    if (existing.countingMethod !== desired.countingMethod && existing.name) {
      if (dryRun) {
        console.log(
          `[dry-run] update key event counting method: ${desired.eventName} -> ${desired.countingMethod}`,
        );
      } else {
        await client.updateKeyEvent({
          updateMask: 'counting_method',
          keyEvent: {
            name: existing.name,
            countingMethod: desired.countingMethod,
          },
        });
        console.log(`updated key event counting method: ${desired.eventName}`);
      }
      continue;
    }

    console.log(`key event already up-to-date: ${desired.eventName}`);
  }
}

async function ensureCustomDimensions(client, parent, dryRun) {
  const existingItems = await listCustomDimensions(client, parent);
  const byParameterName = new Map(existingItems.map((item) => [item.parameterName, item]));

  for (const desired of DEFAULT_CUSTOM_DIMENSIONS) {
    const existing = byParameterName.get(desired.parameterName);

    if (!existing) {
      if (dryRun) {
        console.log(`[dry-run] create custom dimension: ${desired.parameterName}`);
      } else {
        await client.createCustomDimension({
          parent,
          customDimension: desired,
        });
        console.log(`created custom dimension: ${desired.parameterName}`);
      }
      continue;
    }

    const needsUpdate =
      existing.displayName !== desired.displayName || existing.description !== desired.description;

    if (needsUpdate && existing.name) {
      if (dryRun) {
        console.log(`[dry-run] update custom dimension metadata: ${desired.parameterName}`);
      } else {
        await client.updateCustomDimension({
          updateMask: 'display_name,description',
          customDimension: {
            name: existing.name,
            displayName: desired.displayName,
            description: desired.description,
          },
        });
        console.log(`updated custom dimension metadata: ${desired.parameterName}`);
      }
      continue;
    }

    console.log(`custom dimension already up-to-date: ${desired.parameterName}`);
  }
}

async function runList(client, parent) {
  console.log(`Property: ${parent}`);
  printKeyEvents(await listKeyEvents(client, parent));
  printCustomDimensions(await listCustomDimensions(client, parent));
}

async function runSync(client, parent, dryRun) {
  console.log(`Property: ${parent}`);
  if (dryRun) {
    console.log('mode: dry-run');
  }

  await ensureKeyEvents(client, parent, dryRun);
  await ensureCustomDimensions(client, parent, dryRun);
}

async function main() {
  const command = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');

  if (!command || !['list', 'sync'].includes(command)) {
    fail('使い方: node scripts/ga-admin.mjs <list|sync> [--dry-run]');
  }

  const propertyName = getPropertyName();
  const client = getClient();

  if (command === 'list') {
    await runList(client, propertyName);
    return;
  }

  await runSync(client, propertyName, dryRun);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
