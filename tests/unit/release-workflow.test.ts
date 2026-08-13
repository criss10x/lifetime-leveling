import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const workflowPath = resolve('.github/workflows/publish-static.yml');

describe('soft-launch workflow', () => {
  it('installs Chromium and keeps release validation ordered on main', async () => {
    const workflow = await readFile(workflowPath, 'utf8');
    const steps = [
      'npm ci',
      'npx playwright install --with-deps chromium',
      'npm run check',
      'npm run test:unit',
      'npm run build',
      'npm run test:e2e:studio',
      'npm run test:e2e:muslim',
      'npm run check:links',
      'npm run assemble:deploy',
    ];

    expect(workflow).toContain('branches: [main]');

    let previousIndex = -1;
    for (const step of steps) {
      const index = workflow.indexOf(step);
      expect(index, `Missing workflow step: ${step}`).toBeGreaterThan(previousIndex);
      previousIndex = index;
    }
  });
});
