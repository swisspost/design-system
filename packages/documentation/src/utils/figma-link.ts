const fileId = 'xZ0IW0MJO0vnFicmrHiKaY';
const figmaMode: 'design' | 'dev' = 'dev';

export function getComponentFigmaLink(figmaNodeId: string) {
  return `https://www.figma.com/file/${fileId}/Components-Post?type=design&node-id=${figmaNodeId}&mode=${figmaMode}&t=j3o3HMwq5nigL5Mj-4`;
}
