import { execSync } from 'child_process';
import path from 'path';

const GIT_ROOT = path.resolve(import.meta.dirname, '../../..');

interface GitResult {
  pushed: boolean;
  commitHash?: string;
  error?: string;
}

export function gitCommitAndPush(
  relativeFilePath: string,
  commitMessage: string,
): GitResult {
  try {
    execSync(`git add "${relativeFilePath}"`, { cwd: GIT_ROOT, stdio: 'pipe' });

    const status = execSync('git diff --cached --name-only', {
      cwd: GIT_ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    }).trim();

    if (!status) {
      return { pushed: false, error: 'No changes detected' };
    }

    execSync(`git commit -m "${commitMessage}"`, {
      cwd: GIT_ROOT,
      stdio: 'pipe',
    });

    const commitHash = execSync('git rev-parse --short HEAD', {
      cwd: GIT_ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    }).trim();

    execSync('git push origin main', { cwd: GIT_ROOT, stdio: 'pipe' });

    return { pushed: true, commitHash };
  } catch (err: any) {
    return {
      pushed: false,
      error: err.stderr?.toString() || err.message || 'Git operation failed',
    };
  }
}
