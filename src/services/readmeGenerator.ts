import * as fs from "fs";
import * as path from "path";

export function generateReadme(
    folderPath: string,
    problemName: string,
    language: string,
    code: string
): void {

    const content = 
`# ${problemName}

## Language
${language}

## Solution
\`\`\`
${code}
\`\`\`
`;

    const readmePath = path.join(folderPath, "README.md");

    fs.writeFileSync(readmePath, content);
}
