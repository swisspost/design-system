const header = document.querySelector<HTMLSwisspostInternetHeaderElement>(
  'swisspost-internet-header',
);

// ✅ Still works in v10
header.language = 'fr';
header.activeRoute = '/path/to/page';

// ❌ No longer available in v10 - remove these
header.search = false;
header.stickyness = 'full';
header.customConfig = { /* ... */ };
header.languageSwitchOverrides = [ /* ... */ ];
await header.getCurrentLanguage(); // method removed