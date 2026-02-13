import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

async function selectAndMove(
    folderPath: string,
    label: string,
    outputName: string
) {
    const file = await vscode.window.showOpenDialog({
        canSelectMany: false,
        openLabel: `Select ${label} Screenshot`,
        filters: { Images: ["png", "jpg", "jpeg"] }
    });

    if (!file || file.length === 0) {
        return false;
    }

    const src = file[0].fsPath;
    const dest = path.join(folderPath, outputName);

    try {
        fs.renameSync(src, dest);
    } catch (err: any) {
        if (err.code === "EXDEV") {
            fs.copyFileSync(src, dest);
            fs.unlinkSync(src);
        } else {
            throw err;
        }
    }

    return true;
}

export async function handleScreenshotFlow(folderPath: string) {

    const decision = await vscode.window.showQuickPick(
        ["Add Screenshots", "Skip"],
        { placeHolder: "Attach screenshots?" }
    );

    if (!decision || decision === "Skip") {
        return;
    }

    let added = {
        testcases: false,
        submission: false
    };

    while (true) {

        if (added.testcases && added.submission) {
            vscode.window.showInformationMessage("Both screenshots added.");
            return;
        }

        const picks: vscode.QuickPickItem[] = [
            { label: added.testcases ? "✔ Testcases" : "Testcases" },
            { label: added.submission ? "✔ Submission" : "Submission" },
            { label: "Next" }
        ];

        const action = await vscode.window.showQuickPick(picks, {
            placeHolder: "Select what to add"
        });

        if (!action) {
            return;
        }

        if (action.label.includes("Testcases")) {
            const ok = await selectAndMove(
                folderPath,
                "Test Case Output",
                "testcases.png"
            );
            if (ok) {
                added.testcases = true;
            }
        }

        if (action.label.includes("Submission")) {
            const ok = await selectAndMove(
                folderPath,
                "Accepted Submission",
                "submission.png"
            );
            if (ok) {
                added.submission = true;
            }
        }

        if (action.label === "Next") {
            return;
        }
    }
}
