const tabs = document.querySelector('post-tabs') as HTMLPostTabsElement;
tabs.addEventListener('tabChange', (panelName: string) => {
  alert(`The panel named ${panelName} is now displayed.`);
});
