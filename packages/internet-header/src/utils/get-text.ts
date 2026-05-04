import { AccessibleTextConfig, LinkConfig } from '@/models/shared.model';

export function getText(item: string | AccessibleTextConfig | LinkConfig) {
  return typeof item === 'string' ? item : item.text;
}
