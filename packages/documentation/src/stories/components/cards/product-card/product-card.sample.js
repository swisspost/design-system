function syncHeights() {
  const nodes = document.querySelectorAll('[data-sync-height-with]');

  const heightByGroup = new Map();
  nodes.forEach(node => {
    const group = node.getAttribute('data-sync-height-with');
    const groupHeight = heightByGroup.get(group);
    
    node.style.height = 'auto';
    const nodeHeight = node.offsetHeight;

    if (!groupHeight || nodeHeight > groupHeight) {
      heightByGroup.set(group, nodeHeight);
    }
  });

  heightByGroup.forEach((height, group) => {
    const groupNodes = document.querySelectorAll(
      `[data-sync-height-with="${group}"]`
    );

    groupNodes.forEach(node => {
      node.style.height = `${height}px`;
    });
  });
}

let timer;
window.addEventListener('resize', () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    syncHeights();
  }, 300);
});

syncHeights();
