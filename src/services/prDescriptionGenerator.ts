export function generatePRDescription(
  problemName: string,
  executionTime: string,
  problemType: string,
  difficulty: string,
  authorName: string,
  authorGithub: string,
  solutionFile: string,
  readmeFile: string
): string {

  return `# Title
Add solution ${problemName}

---

## Summary
Adds solution implementation and README.

---

## ⏱ Execution Time
${executionTime || "N/A"}

---

## Problem Type
${problemType}

---

## Difficulty
${difficulty || "N/A"}

---

## Author
**${authorName}**  
${authorGithub}

---

## Files
- ${problemName}/${solutionFile}  
- ${problemName}/${readmeFile}
`;
}
