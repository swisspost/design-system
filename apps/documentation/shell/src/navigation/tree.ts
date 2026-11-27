import { VISIBILITY_TAG_PREFIX, type VisibilityTag } from '@shared/tags';
import type { Catalog, Page } from '../catalog/catalog';
import { getRootDefinition } from './navigation';

const DEV_TAG: VisibilityTag = `${VISIBILITY_TAG_PREFIX}dev`;

/** A row of the navigation: a page, a folder, or both (a page with subpages, e.g. "Header"). */
export interface NavigationNode {
  key: string;
  label: string;
  root: string;
  /** 1 for the direct children of a section, 2 for their children, … */
  depth: number;
  page: Page | null;
  href: string | null;
  children: NavigationNode[];
}

export type NavigationSection =
  | { type: 'home'; label: string; nodes: NavigationNode[] }
  | { type: 'collapsible'; key: string; label: string; nodes: NavigationNode[] }
  | { type: 'flat'; nodes: NavigationNode[] };

/** Groups the listed pages into sections, in the order of the catalog. */
export function buildNavigation(catalog: Catalog, devMode: boolean): NavigationSection[] {
  const sections: NavigationSection[] = [];
  const sectionsByRoot = new Map<string, NavigationSection>();

  for (const page of catalog.pages) {
    if (!isListed(page, devMode)) continue;

    const root = page.segments[0];
    let section = sectionsByRoot.get(root);

    if (!section) {
      const layout = getRootDefinition(root).layout;

      if (layout === 'home') section = { type: 'home', label: 'Home', nodes: [] };
      else if (layout === 'flat') section = { type: 'flat', nodes: [] };
      else section = { type: 'collapsible', key: toKey([root]), label: root, nodes: [] };

      sectionsByRoot.set(root, section);
      sections.push(section);
    }

    // a page titled with its root only (e.g. "Introduction") is listed with the root name
    const segments = page.segments.length > 1 ? page.segments.slice(1) : [root];
    insert(section.nodes, segments, [root], page, catalog.canonicalURL(page));
  }

  return sections;
}

/** Hidden roots and, outside the dev mode, dev pages are reachable by URL only. */
export function isListed(page: Page, devMode: boolean): boolean {
  if (getRootDefinition(page.segments[0]).layout === 'hidden') return false;
  return devMode || !page.tags.includes(DEV_TAG);
}

/** The keys of the section and folders that contain the page, outermost first. */
export function getAncestorKeys(sections: NavigationSection[], pageId: string): string[] {
  for (const section of sections) {
    const path = findPath(section.nodes, pageId);
    if (!path) continue;

    return section.type === 'collapsible' ? [section.key, ...path] : path;
  }

  return [];
}

function insert(
  nodes: NavigationNode[],
  segments: string[],
  parents: string[],
  page: Page,
  href: string,
) {
  const label = segments[0];
  const key = toKey([...parents, label]);
  let node = nodes.find(child => child.key === key);

  if (!node) {
    node = {
      key,
      label,
      root: parents[0],
      depth: parents.length,
      page: null,
      href: null,
      children: [],
    };
    nodes.push(node);
  }

  if (segments.length > 1) {
    insert(node.children, segments.slice(1), [...parents, label], page, href);
  } else {
    node.page = page;
    node.href = href;
  }
}

function findPath(nodes: NavigationNode[], pageId: string): string[] | null {
  for (const node of nodes) {
    if (node.page?.id === pageId) return [];

    const path = findPath(node.children, pageId);
    if (path) return [node.key, ...path];
  }

  return null;
}

function toKey(segments: string[]): string {
  return segments
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
