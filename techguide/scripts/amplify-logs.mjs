#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const [command, positionalLogGroupName] = process.argv.slice(2);

const region =
  process.env.AMPLIFY_AWS_REGION?.trim() ||
  process.env.AWS_REGION?.trim() ||
  process.env.AWS_DEFAULT_REGION?.trim() ||
  'ap-northeast-1';
const logGroupName =
  positionalLogGroupName?.trim() ||
  process.env.AMPLIFY_LOG_GROUP_NAME?.trim() ||
  process.env.LOG_GROUP_NAME?.trim();
const logGroupPrefix = process.env.AMPLIFY_LOG_GROUP_PREFIX?.trim() || '/aws/amplify';
const since = process.env.LOG_SINCE?.trim() || '10m';
const filterPattern = process.env.LOG_FILTER_PATTERN?.trim();
const streamPrefix = process.env.LOG_STREAM_PREFIX?.trim();

function printHelp() {
  console.log(`Usage:
  pnpm logs:groups
  pnpm logs:tail -- <log-group-name>
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

function runAws(args) {
  const result = spawnSync('aws', args, { stdio: 'inherit' });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      console.error('AWS CLI が見つかりません。`aws --version` が通る状態で実行してください。');
    } else {
      console.error(result.error.message);
    }
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === 'groups') {
  runAws([
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
  ]);
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
