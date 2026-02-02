import * as fs from "fs";
import * as path from "path";

export function copySolutionFile(
    sourcePath: string,
    destFolder: string,
    language: string
) {

    const extensionMap: Record<string, string> = {
        "Java": ".java",
        "Python": ".py",
        "C++": ".cpp",
        "C": ".c",
        "JavaScript": ".js",
        "TypeScript": ".ts"
    };

    const ext = extensionMap[language] || ".txt";

    const destinationPath = path.join(destFolder, `Solution${ext}`);

    fs.copyFileSync(sourcePath, destinationPath);
}
