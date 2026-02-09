import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function pickAndCopyScreenshots(folderPath: string) {

    const files = await vscode.window.showOpenDialog({
        canSelectMany: true,
        openLabel: "Select screenshots",
        filters: {
            Images: ["png", "jpg", "jpeg"]
        }
    });

    if (!files || files.length === 0) {
        return;
    }

    for (const file of files) {

        const choice = await vscode.window.showQuickPick(
            [
                { label: "Test Case Output", value: "testcases.png" },
                { label: "Accepted Submission", value: "submission.png" },
                { label: "Skip", value: "skip" }
            ],
            {
                placeHolder: `Classify screenshot: ${path.basename(file.fsPath)}`,
                ignoreFocusOut: true
            }
        );

        if (!choice || choice.value === "skip") {
            continue;
        }

        const destPath = path.join(folderPath, choice.value);

        // Copy
        fs.copyFileSync(file.fsPath, destPath);

        // Delete original
        try {
            fs.unlinkSync(file.fsPath);
        } catch {
            vscode.window.showWarningMessage(
                `Copied but could not delete original: ${file.fsPath}`
            );
        }
    }
}
