# Snapshots

A few steps are required (for the moment) before you can run the snapshot generating script.

1. Login to [percy](https://percy.io/).
2. Create a project or navigate to an existing one.
3. Copy your write-only-percy-token (you can find it under Project settings).
4. Open a console in the project root folder.
5. Register the following local environment variable:

```bash
# windows node/bash/cmd
set PERCY_TOKEN={percy-write-only-token}

# windows powershell
$env:PERCY_TOKEN="{percy-write-only-token}"

# mac terminal
export PERCY_TOKEN={percy-write-only-token}
```

6. If you want to take snapshots from a localhost url, you need to allow unauthorized node-tls connections:<br>:warning: We need to find a workaround for this, so we do not need to enable unsecure connections!

```bash
# windows node/bash/cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0

# windows powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"

# mac terminal
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

7. Run script `pnpm storybook:snapshots`
8. Once the snapshots are done, you should see a new build in your percy project.
