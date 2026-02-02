import * as fs from "fs";
import * as path from "path";

export function createProblemFolder(basePath: string, folderName: string): string {

    const folderPath = path.join(basePath, folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    return folderPath;
}
