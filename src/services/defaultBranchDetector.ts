import { execSync } from "child_process";

export function getDefaultBranch(repoPath: string): string {

  try {
    // Try remote HEAD
    const result = execSync(
      "git symbolic-ref refs/remotes/origin/HEAD",
      { cwd: repoPath }
    ).toString().trim();

    return result.replace("refs/remotes/origin/", "");
  } catch {

    try {
      // Fallback to current checked-out branch
      const current = execSync(
        "git rev-parse --abbrev-ref HEAD",
        { cwd: repoPath }
      ).toString().trim();

      return current;
    } catch {

      // Final safe fallback
      return "master";
    }
  }
}
