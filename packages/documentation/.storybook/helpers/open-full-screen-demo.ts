export const openFullScreenDemo = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const canvas = target.closest('.docs-story');
  const story = canvas?.querySelector('.sb-story');
  const iframeId = story?.id?.replace('story--', '');

  if (iframeId) {
    window.open(`/iframe.html?id=${iframeId}`,'_blank');
  } else {
    alert('The full screen demo is not available.');
  }
};
