#!/usr/bin/env bash
#
# Runs the Cypress suites of the packages in $PACKAGES (space-separated) one after the other,
# limited to the spec files in $SPECS (comma-separated) when it is set.
# Suites sharing a runner all run, even if one fails, and the script fails if any of them did.
# The storybook server has to be running already, see .github/workflows/e2e-tests.yaml.
#
set -u

read -ra packages <<< "${PACKAGES:-}"

# Without a package nothing would run, and the job would pass without testing anything
if [[ ${#packages[@]} -eq 0 ]]; then
  echo "::error::No package to test, PACKAGES is empty"
  exit 1
fi

status=0

for package in "${packages[@]}"; do
  pnpm --filter "$package" e2e:ci ${SPECS:+--spec "$SPECS"} || status=1
done

exit $status