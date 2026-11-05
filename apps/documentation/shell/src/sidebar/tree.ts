import type { DocsPage } from '../storybook';
import { FLAT_ROOTS, HIDDEN_ROOTS, HOME_ROOT, TAG_DEV_ONLY } from './config';

/**
 * A row in the sidebar: a page, a folder, or both (a page that has subpages, e.g. "Header").
 */
export interface TreeNode {
  /** Unique within the tree, derived from the title segments */
  key: string;
  label: string;
  /** The root category the node belongs to */
  root: string;
  /** 1 for direct children of a category, 2 for their children, … */
  depth: number;
  page?: DocsPage;
  children: TreeNode[];
}

export type SidebarSection =
  | { type: 'home'; label: string; nodes: TreeNode[] }
  | { type: 'category'; key: string; label: string; nodes: TreeNode[] }
  | { type: 'flat'; nodes: TreeNode[] };

/**
 * Groups the docs pages into the sidebar sections, keeping the index order.
 * Pages tagged `devOnly` are only included in dev mode.
 */
export function buildSidebar(pages: DocsPage[], devMode: boolean): SidebarSection[] {
  const sections: SidebarSection[] = [];
  const sectionsByRoot = new Map<string, SidebarSection>();

  pages
    .filter(page => !HIDDEN_ROOTS.includes(page.segments[0]))
    .filter(page => devMode || !page.tags.includes(TAG_DEV_ONLY))
    .forEach(page => {
      const [root, ...rest] = page.segments;
      let section = sectionsByRoot.get(root);

      if (!section) {
        if (root === HOME_ROOT) section = { type: 'home', label: 'Home', nodes: [] };
        else if (FLAT_ROOTS.includes(root)) section = { type: 'flat', nodes: [] };
        else section = { type: 'category', key: toKey([root]), label: root, nodes: [] };

        sectionsByRoot.set(root, section);
        sections.push(section);
      }

      // pages titled with the root only (e.g. "Introduction") are listed by the root name
      insert(section.nodes, rest.length ? rest : [root], page, [root], 1);
    });

  return sections;
}

/**
 * Keys of the folders that contain the given page, outermost first.
 */
export function getAncestorKeys(sections: SidebarSection[], pageId: string): string[] {
  for (const section of sections) {
    const path = findPath(section.nodes, pageId);
    if (path) return section.type === 'category' ? [section.key, ...path] : path;
  }
  return [];
}

function insert(
  nodes: TreeNode[],
  segments: string[],
  page: DocsPage,
  parents: string[],
  depth: number,
) {
  const [label, ...rest] = segments;
  const key = toKey([...parents, label]);
  let node = nodes.find(child => child.key === key);

  if (!node) {
    node = { key, label, root: parents[0], depth, children: [] };
    nodes.push(node);
  }

  if (rest.length) insert(node.children, rest, page, [...parents, label], depth + 1);
  else node.page = page;
}

function findPath(nodes: TreeNode[], pageId: string): string[] | null {
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
