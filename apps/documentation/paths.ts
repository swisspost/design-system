import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DOCS_ROOT = dirname(fileURLToPath(import.meta.url));
export const SHELL_ROOT = join(DOCS_ROOT, 'shell');

export const NODE_MODULES = join(DOCS_ROOT, 'node_modules');
export const PUBLIC_DIR = join(DOCS_ROOT, 'public');
export const OUT_DIR = join(DOCS_ROOT, 'dist');
