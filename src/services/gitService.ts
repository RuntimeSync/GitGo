import { execSync } from "child_process";

export function runGitCommands(
    repoPath: string,
    problemName: string
) {

    execSync("git pull", { cwd: repoPath, stdio: "inherit" });
    execSync("git add .", { cwd: repoPath, stdio: "inherit" });
    execSync(`git commit -m "Add solution ${problemName}"`, { cwd: repoPath, stdio: "inherit" });
    execSync("git push", { cwd: repoPath, stdio: "inherit" });
}
