#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const [command, positionalLogGroupName] = process.argv.slice(2);

const region =
  process.env.AMPLIFY_AWS_REGION?.trim() ||
  process.env.AWS_REGION?.trim() ||
  process.env.AWS_DEFAULT_REGION?.trim() ||
  'ap-northeast-1';
const rawLogGroupName =
  positionalLogGroupName?.trim() ||
  process.env.AMPLIFY_LOG_GROUP_NAME?.trim() ||
  process.env.LOG_GROUP_NAME?.trim();
const logGroupPrefix = process.env.AMPLIFY_LOG_GROUP_PREFIX?.trim() || '/aws/amplify';
const since = process.env.LOG_SINCE?.trim() || '10m';
const filterPattern = process.env.LOG_FILTER_PATTERN?.trim();
const logTarget = parseLogTarget(rawLogGroupName);
const logGroupName = logTarget.logGroupName;
const streamPrefix = process.env.LOG_STREAM_PREFIX?.trim() || logTarget.streamPrefix;

function printHelp() {
  console.log(`Usage:
  pnpm logs:groups
  pnpm logs:tail -- <log-group-name>
  pnpm logs:tail -- 'log-group:/aws/amplify/<app-id>:logStreamNameFilter:<branch>'
  AMPLIFY_LOG_GROUP_NAME=<log-group-name> pnpm logs:tail

Environment:
  AMPLIFY_AWS_REGION / AWS_REGION / AWS_DEFAULT_REGION  default: ap-northeast-1
  AMPLIFY_LOG_GROUP_PREFIX                              default: /aws/amplify
  AMPLIFY_LOG_GROUP_NAME                                required for logs:tail unless passed as an argument
  LOG_SINCE                                             default: 10m
  LOG_FILTER_PATTERN                                    optional CloudWatch filter pattern
  LOG_STREAM_PREFIX                                     optional log stream prefix
`);
}

function decodeCloudWatchConsolePart(value) {
  let decoded = value;

  for (let i = 0; i < 3; i += 1) {
    const normalized = decoded.replace(/\$([0-9A-Fa-f]{2})/g, '%$1');

    try {
      const next = decodeURIComponent(normalized);
      if (next === decoded) {
        return next;
      }
      decoded = next;
    } catch {
      return decoded;
    }
  }

  return decoded;
}

function parseLogTarget(value) {
  if (!value) {
    return { logGroupName: undefined, streamPrefix: undefined };
  }

  const decodedValue = decodeCloudWatchConsolePart(value);
  const consoleMatch = decodedValue.match(/^log-group:(.+?)(?::logStreamNameFilter:(.+))?$/);
  if (!consoleMatch) {
    return { logGroupName: decodedValue, streamPrefix: undefined };
  }

  return {
    logGroupName: decodeCloudWatchConsolePart(consoleMatch[1]),
    streamPrefix: consoleMatch[2] ? decodeCloudWatchConsolePart(consoleMatch[2]) : undefined,
  };
}

function handleAwsError(result) {
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      console.error('AWS CLI が見つかりません。`aws --version` が通る状態で実行してください。');
    } else {
      console.error(result.error.message);
    }
    process.exit(1);
  }
}

function runAws(args) {
  const result = spawnSync('aws', args, { stdio: 'inherit' });

  handleAwsError(result);

  process.exit(result.status ?? 1);
}

function runAwsAndPrint(args, emptyMessage) {
  const result = spawnSync('aws', args, { encoding: 'utf8' });

  handleAwsError(result);

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  const output = result.stdout.trimEnd();
  if (output.length > 0) {
    console.log(output);
    process.exit(0);
  }

  console.log(emptyMessage);
  process.exit(0);
}

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === 'groups') {
  runAwsAndPrint(
    [
      'logs',
      'describe-log-groups',
      '--log-group-name-prefix',
      logGroupPrefix,
      '--region',
      region,
      '--query',
      'logGroups[].{name:logGroupName,retention:retentionInDays,storedBytes:storedBytes}',
      '--output',
      'table',
    ],
    `CloudWatch Logs のロググループが見つかりませんでした。

region: ${region}
prefix: ${logGroupPrefix}

確認してください:
- Amplify Console > Monitoring > Hosting compute logs に表示されるロググループ名を直接確認する
- リージョンが違う場合は AMPLIFY_AWS_REGION=<region> pnpm logs:groups で再実行する
- prefix が違う場合は AMPLIFY_LOG_GROUP_PREFIX=<prefix> pnpm logs:groups で再実行する
- SSR app のデプロイ後に /contact などのSSRページへアクセスしてから再実行する
- カスタムService roleを使っている場合は CloudWatch Logs への作成/書き込み権限を確認する`,
  );
}

if (command === 'tail') {
  if (!logGroupName) {
    console.error(
      '`logs:tail` にはロググループ名が必要です。先に `pnpm logs:groups` で候補を確認してください。',
    );
    printHelp();
    process.exit(1);
  }

  const args = [
    'logs',
    'tail',
    logGroupName,
    '--follow',
    '--since',
    since,
    '--format',
    'short',
    '--region',
    region,
  ];

  if (filterPattern) {
    args.push('--filter-pattern', filterPattern);
  }

  if (streamPrefix) {
    args.push('--log-stream-name-prefix', streamPrefix);
  }

  runAws(args);
}

console.error(`unknown command: ${command}`);
printHelp();
process.exit(1);
