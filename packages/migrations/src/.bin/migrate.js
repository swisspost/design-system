#!/usr/bin/env node

const { exec } = require('child_process');

exec('npx ng update @swisspost/design-system-styles --from=4 --to=5 --migrate-only --create-commits', (error, stdout, stderr) => {
  if (error) {
    console.error(`ERROR: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`ERROR: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});