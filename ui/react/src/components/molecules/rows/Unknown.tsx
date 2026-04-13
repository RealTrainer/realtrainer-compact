import clsx from 'clsx';
import { normalizeRow } from './types';

export function Unknown({ row }: { row: Parameters<typeof normalizeRow<'unknown'>>[0] }) {
  const unknown = normalizeRow(row);
  return <p className={clsx('rt-row rt-row-unknown p-3 text-sm text-rose-200')}>{unknown.raw}</p>;
}