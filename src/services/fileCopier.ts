import * as fs from "fs";
import * as path from "path";
import { Result } from "../domain/Result";

export function copySolutionFile(
  sourcePath: string,
  destFolder: string,
  solutionFileName: string
): Result<void> {

  try {
    const destinationPath = path.join(destFolder, solutionFileName);

    fs.copyFileSync(sourcePath, destinationPath);

    return { ok: true, data: undefined };

  } catch {
    return {
      ok: false,
      errorType: "ENV",
      message: "Failed to copy solution file"
    };
  }
}
