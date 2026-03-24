/**
 * Validation Script for Icon Downloads
 * 
 * Validates the icon report.json file to ensure all icons
 * were properly downloaded and meet quality standards.
 */

import fs from 'fs';
import path from 'path';

const REPORT_PATH = 'packages/icons/public/report.json';
const MAX_ICONS_TO_DISPLAY = 10;
const EXPECTED_SOURCE_COUNTS = { ui: 6, post: 1 };

/**
 * Validates the icon report and returns validation results
 */
export function validateIconReport() {
  const reportPath = path.join(process.cwd(), REPORT_PATH);
  
  if (!fs.existsSync(reportPath)) {
    return createErrorResult('Report file not found', 'The report.json file was not found. The build may have failed.');
  }

  let report;
  try {
    report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  } catch (error) {
    return createErrorResult('Failed to parse report', 'The report.json file could not be parsed.');
  }

  if (!report.icons || !report.stats) {
    return createErrorResult('Invalid report structure', 'The report.json file has an invalid structure.');
  }

  const issues = collectIssues(report.icons);
  const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
  const passRate = calculatePassRate(report.stats.success, report.icons.length);

  return {
    success: totalIssues === 0,
    message: totalIssues === 0
      ? `✅ All ${report.stats.success} icons validated successfully!`
      : `❌ Icon validation failed with ${totalIssues} issue(s)`,
    stats: {
      total: report.icons.length,
      success: report.stats.success,
      failed: report.icons.length - report.stats.success,
      passRate,
    },
    issues: totalIssues > 0 ? issues : null,
  };
}

/**
 * Creates a standardized error result
 */
function createErrorResult(error, message) {
  return {
    success: false,
    error,
    message: `❌ ${message}`,
  };
}

/**
 * Calculates pass rate percentage
 */
function calculatePassRate(success, total) {
  return ((success / total) * 100).toFixed(1);
}

/**
 * Collects all issues from icons
 */
function collectIssues(icons) {
  const issues = {
    errored: [],
    noSVG: [],
    wrongViewBox: [],
    noKeywords: [],
    missingSourceFiles: [],
    duplicates: [],
  };

  icons.forEach(icon => {
    if (icon.stats.success) return;

    const { stats } = icon;
    const iconInfo = { id: icon.id, name: icon.file.basename };

    // Handle array-based issues
    const arrayIssues = [
      { key: 'errored', field: 'errorCount' },
      { key: 'noSVG', field: 'count' },
      { key: 'wrongViewBox', field: 'count' },
      { key: 'duplicates', field: 'count' }
    ];

    arrayIssues.forEach(({ key, field }) => {
      if (stats[key]?.length > 0) {
        issues[key].push({ ...iconInfo, [field]: stats[key].length });
      }
    });

    // Handle boolean-based issues
    if (!stats.hasKeywords) {
      issues.noKeywords.push(iconInfo);
    }

    if (!stats.hasAllSources) {
      issues.missingSourceFiles.push({
        ...iconInfo,
        set: stats.set,
        expected: EXPECTED_SOURCE_COUNTS[stats.set] || 1,
        actual: stats.sources.length,
      });
    }
  });

  return issues;
}

/**
 * Formats issue section for PR comment
 */
function formatIssueSection(title, description, icons, formatter) {
  if (icons.length === 0) return '';

  const displayIcons = icons.slice(0, MAX_ICONS_TO_DISPLAY);
  const remaining = icons.length - MAX_ICONS_TO_DISPLAY;

  let section = `#### ${title} (${icons.length})\n${description}\n\n`;
  section += displayIcons.map(formatter).join('\n') + '\n';
  
  if (remaining > 0) {
    section += `\n_... and ${remaining} more_\n`;
  }
  
  return section + '\n';
}

/**
 * Builds the PR comment body
 */
function buildCommentBody(result) {
  const sections = [
    buildHeader(result),
    buildStatistics(result.stats),
    buildIssues(result.issues),
  ].filter(Boolean);

  return sections.join('');
}

/**
 * Builds header section
 */
function buildHeader(result) {
  let header = '## 🔍 Icon Validation Report\n\n';
  
  if (result.success) {
    header += '### ✅ Validation Passed\n\nAll icons have been validated successfully!\n\n';
  } else {
    header += `### ❌ Validation Failed\n\n${result.message}\n\n`;
  }
  
  return header;
}

/**
 * Builds statistics table
 */
function buildStatistics(stats) {
  return '### 📊 Statistics\n\n' +
    '| Metric | Value |\n' +
    '|--------|-------|\n' +
    `| Total Icons | ${stats.total} |\n` +
    `| ✅ Successful | ${stats.success} |\n` +
    `| ❌ Failed | ${stats.failed} |\n` +
    `| Pass Rate | ${stats.passRate}% |\n\n`;
}

/**
 * Builds issues section
 */
function buildIssues(issues) {
  if (!issues) {
    return '### 🎉 Perfect!\n\nNo issues detected. All icons meet quality standards.\n';
  }

  const issueTypes = [
    {
      key: 'errored',
      title: '❌ Download Errors',
      description: 'These icons failed to download from the source:',
      formatter: icon => `- **${icon.name}** (ID: ${icon.id}) - ${icon.errorCount} error(s)`
    },
    {
      key: 'noSVG',
      title: '❌ Missing SVG Content',
      description: 'These icons have no SVG content:',
      formatter: icon => `- **${icon.name}** (ID: ${icon.id})`
    },
    {
      key: 'wrongViewBox',
      title: '⚠️ Wrong ViewBox',
      description: 'These icons have incorrect viewBox dimensions:',
      formatter: icon => `- **${icon.name}** (ID: ${icon.id})`
    },
    {
      key: 'noKeywords',
      title: '⚠️ No Keywords',
      description: 'These icons lack keywords for searchability:',
      formatter: icon => `- **${icon.name}** (ID: ${icon.id})`
    },
    {
      key: 'missingSourceFiles',
      title: '❌ Missing Source Files',
      description: 'These icon groups are missing expected size variants:',
      formatter: icon => `- **${icon.name}** (ID: ${icon.id}) - ${icon.actual}/${icon.expected} files (${icon.set} icons)`
    },
    {
      key: 'duplicates',
      title: '⚠️ Duplicates',
      description: 'These icons have duplicate entries:',
      formatter: icon => `- **${icon.name}** (ID: ${icon.id}) - ${icon.count} duplicate(s)`
    }
  ];

  let body = '### ⚠️ Issues Found\n\n';
  
  issueTypes.forEach(({ key, title, description, formatter }) => {
    body += formatIssueSection(title, description, issues[key], formatter);
  });

  body += buildNextSteps();

  return body;
}

/**
 * Builds next steps section
 */
function buildNextSteps() {
  return '### 🔧 Next Steps\n\n' +
    '1. Review the issues listed above\n' +
    '2. Re-run the icon fetch process if needed\n' +
    '3. Check the [icons health page](https://design-system.post.ch) for detailed diagnostics\n' +
    '4. Fix any source data issues in the icon management system\n' +
    '5. Push updated icons to re-trigger validation\n';
}

/**
 * Posts or updates a PR comment with validation results
 */
export async function commentValidationResults(github, context, validationResultJson) {
  const result = JSON.parse(validationResultJson);
  const commentBody = buildCommentBody(result);

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });

  const botComment = comments.find(
    comment => comment.user.type === 'Bot' && comment.body.includes('Icon Validation Report')
  );

  const commentParams = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentBody,
  };

  if (botComment) {
    await github.rest.issues.updateComment({
      ...commentParams,
      comment_id: botComment.id,
    });
  } else {
    await github.rest.issues.createComment({
      ...commentParams,
      issue_number: context.issue.number,
    });
  }
}
