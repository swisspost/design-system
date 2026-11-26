#!/usr/bin/env bash
#
# Runs the Cypress suites of the packages in $PACKAGES (space-separated) one after the other,
# limited to the spec files in $SPECS (comma-separated) when it is set.
# Suites sharing a runner all run, even if one fails, and the script fails if any of them did.
# The storybook server has to be running already, see .github/workflows/e2e-tests.yaml.
#
status=0

for package in $PACKAGES; do
  pnpm --filter "$package" e2e:ci ${SPECS:+--spec "$SPECS"} || status=1
done

exit $status