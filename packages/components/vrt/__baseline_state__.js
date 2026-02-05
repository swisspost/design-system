/**
 * VRT BASELINE STATE - T0 (Main branch)
 * This file tracks the VRT baseline state throughout the race condition scenario
 * 
 * BASELINE_T0: The initial baseline that PR tests are compared against
 * Both PR #101 and PR #102 will test against this baseline
 */

// PR #101 CHANGE: Change button color from BLUE to RED
export const BASELINE_STATE = {
  version: '1.0',
  branch: 'pr-101-red-button-header',
  timestamp: 'T1',
  headerButtonColor: 'RED', // CHANGED: was BLUE
  headerButtonPadding: 'normal',
  change: 'PR #101 - Change button color to RED',
  testedAgainstBaseline: 'BASELINE_T0 (blue, normal)',
  vrtComparisonResult: 'FAIL - RED vs BLUE (intentional, approved)',
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BASELINE_STATE };
}
