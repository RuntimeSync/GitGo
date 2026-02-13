import * as fs from "fs";
import * as path from "path";
import { ProblemType } from "../types/problemType";
import { getLeetCodeReadme } from "../templates/leetcodeReadme";
import { getNormalReadme } from "../templates/normalReadme";
import { Result } from "../domain/Result";
import { Author } from "../domain/Author";

export function generateReadme(
  folderPath: string,
  problemType: ProblemType,
  problemName: string,
  language: string,
  code: string,
  executionTime: string,
  difficulty: string,
  solutionFileName: string,
  author: Author
): Result<void> {

  try {

    // Detect if screenshots exist
    const testCaseExists = fs.existsSync(
      path.join(folderPath, "testcases.png")
    );

    const submissionExists = fs.existsSync(
      path.join(folderPath, "submission.png")
    );

    let content = "";

    if (problemType === ProblemType.LEETCODE) {

      content = getLeetCodeReadme({
        problemName: problemName,
        language: language,
        difficulty: difficulty,
        executionTime: executionTime,
        solutionFile: solutionFileName,
        authorName: author.name,
        github: author.github,
        linkedin: author.linkedin
      });

      // Remove screenshot sections if missing
      if (!testCaseExists) {
        content = content.replace(
          /📸 \*\*Test Case Screenshot\*\*[\s\S]*?\n\n/,
          ""
        );
      }

      if (!submissionExists) {
        content = content.replace(
          /📸 \*\*Submission Screenshot\*\*[\s\S]*?\n\n/,
          ""
        );
      }

    } else {

      content = getNormalReadme({
        problemName: problemName,
        shortDescription: "Solution implementation",
        fileName: solutionFileName,
        authorName: author.name,
        github: author.github,
        linkedin: author.linkedin
      });

    }

    const readmePath = path.join(folderPath, "README.md");
    fs.writeFileSync(readmePath, content);

    return { ok: true, data: undefined };

  } catch {
    return {
      ok: false,
      errorType: "ENV",
      message: "Failed to generate README"
    };
  }
}
