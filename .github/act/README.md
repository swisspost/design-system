# Local testing for your github actions

You can use [act](https://github.com/nektos/act) to test your github worflows locally.

## Installation

1. Download the docker-desktop app.
2. Configure proxy (if needed for your environment).<br>
   1. Open docker-desktop
   2. Go to settings -> Resources -> Proxies
   3. Activate "Manual proxy configuration and enter your proxy settings.
3. Open [act](https://github.com/nektos/act) and follow the installation guide to install act.

## First run

1. Open console in your repository root-folder.
2. Choose your prefered docker-image.
3. Run <code>act -n</code> or <code>act pull_request -n</code><br>

## Dependant Workflows

If a github event requires further informations to be executable, for example a workflow that needs to have a specific type:

```yaml
name: Workflow B
on:
  workflow_run:
    workflows: ['Workflow A']
    types:
      - completed
```

You need to add a .json file to for example <code>.github/act/workflow_run/workflow-a.json</code> which provides required informations from the previous workflow.
If you did so, you can run <code>act workflow_run -e .github/act/workflow_run/workflow-a.json -n</code> to test workflow-b.

Visit act Events [documentation](https://github.com/nektos/act#events) and [Github events](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads) for further informations.
