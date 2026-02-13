import { execSync } from "child_process";
import * as vscode from "vscode";
import { getDefaultBranch } from "./defaultBranchDetector";
import { getRepoInfo } from "./repoInfoService";
import { generatePRDescription } from "./prDescriptionGenerator";

/* ============================= */
/* SAFE EXEC WRAPPER             */
/* ============================= */

function safeExec(command: string, cwd: string) {
  try {
    return execSync(command, { cwd, stdio: "pipe" });
  } catch {
    throw new Error(`Git command failed: ${command}`);
  }
}

/* ============================= */
/* NORMAL PUSH MODE              */
/* ============================= */

export function runGitCommands(
  repoPath: string,
  problemName: string
) {
  try {
    const branch = getDefaultBranch(repoPath);

    // Always be on correct branch first
    safeExec(`git checkout ${branch}`, repoPath);
    safeExec(`git pull origin ${branch}`, repoPath);

    // Stage + commit
    safeExec(`git add .`, repoPath);
    safeExec(
      `git diff --cached --quiet || git commit -m "Add solution and documentation for ${problemName}"`,
      repoPath
    );

    // Push
    safeExec(`git push origin ${branch}`, repoPath);

  } catch (err: any) {
    vscode.window.showErrorMessage(err.message || "Git operation failed");
  }
}

/* ============================= */
/* PR MODE COMMANDS              */
/* ============================= */

export function runGitCommandsWithPR(
  repoPath: string,
  problemName: string,
  branchName: string,
  executionTime: string,
  problemType: string,
  difficulty: string,
  authorName: string,
  authorGithub: string,
  solutionFileName: string
) {
  try {
    const baseBranch = getDefaultBranch(repoPath);

    // Sync base branch
    safeExec(`git checkout ${baseBranch}`, repoPath);
    safeExec(`git pull origin ${baseBranch}`, repoPath);

    // Remove existing branch (local + remote)
    try { safeExec(`git branch -D ${branchName}`, repoPath); } catch {}
    try { safeExec(`git push origin --delete ${branchName}`, repoPath); } catch {}

    // Create and switch to feature branch
    safeExec(`git checkout -b ${branchName}`, repoPath);

    // Stage + commit ON THE PR BRANCH
    safeExec(`git add .`, repoPath);
    safeExec(
      `git diff --cached --quiet || git commit -m "Add solution and documentation for ${problemName}"`,
      repoPath
    );

    // Push branch
    safeExec(`git push -u origin ${branchName}`, repoPath);

    // PR description
    const normalizedAuthorGithub = authorGithub.startsWith("http")
      ? authorGithub
      : `https://github.com/${authorGithub}`;

    const prDescription = generatePRDescription(
      problemName,
      executionTime,
      problemType,
      difficulty,
      authorName,
      normalizedAuthorGithub,
      solutionFileName,
      "README.md"
    );

    vscode.env.clipboard.writeText(prDescription);

    // Open PR page
    const repoInfoResult = getRepoInfo(repoPath);
    if (repoInfoResult.ok) {
      const prUrl =
        `https://github.com/${repoInfoResult.data.owner}/${repoInfoResult.data.repo}` +
        `/compare/${baseBranch}...${branchName}?expand=1`;
      vscode.env.openExternal(vscode.Uri.parse(prUrl));
    }

  } catch (err: any) {
    vscode.window.showErrorMessage(err.message || "Git operation failed");
  }
}
