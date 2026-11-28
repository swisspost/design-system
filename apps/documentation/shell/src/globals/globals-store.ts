import {
  compareGlobals,
  DEFAULT_GLOBALS,
  type Globals,
  GlobalsChangeEvent,
  type GlobalsEventMap,
  normalizeGlobals,
} from '@shared/globals';
import { TypedEventTarget } from '@shared/events';

const STORAGE_KEY = 'post-docs:globals';

/**
 * The globals chosen by the user, kept in the local storage.
 */
export class GlobalsStore extends TypedEventTarget<GlobalsEventMap> {
  private globals: Globals = readStoredGlobals();

  public get current(): Globals {
    return this.globals;
  }

  public set(globals: Partial<Globals>): void {
    const next = normalizeGlobals(globals, this.globals);
    if (compareGlobals(next, this.globals)) return;

    this.globals = next;
    writeStoredGlobals(next);
    this.dispatchEvent(new GlobalsChangeEvent(next));
  }
}

function readStoredGlobals(): Globals {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeGlobals(JSON.parse(stored)) : DEFAULT_GLOBALS;
  } catch {
    return DEFAULT_GLOBALS;
  }
}

function writeStoredGlobals(globals: Globals) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globals));
  } catch {
    // The storage is not available (e.g. in private mode), so the globals only
    // last until the next reload.
  }
}
