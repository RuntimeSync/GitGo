import * as vscode from "vscode";
import { detectLanguage } from "../services/languageDetector";
import { createProblemFolder } from "../services/folderCreator";
import { copySolutionFile } from "../services/fileCopier";
import { generateReadme } from "../services/readmeGenerator";
import { pickAndCopyScreenshots } from "../services/screenshotHandler";
import { runGitCommands } from "../services/gitService";

export async function publishSolution() {

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage("No active file open");
        return;
    }

    const filePath = editor.document.fileName;
    const code = editor.document.getText();

    const language = detectLanguage(filePath);

    const folderName = await vscode.window.showInputBox({
        prompt: "Enter problem folder name (e.g., 231-Power-of-Two)"
    });

    if (!folderName) {
        vscode.window.showErrorMessage("Folder name required");
        return;
    }
    
const basePath = "C:/Projects/test";


    const folderPath = createProblemFolder(basePath, folderName);

    copySolutionFile(filePath, folderPath, language);

    generateReadme(folderPath, folderName, language, code);

    await pickAndCopyScreenshots(folderPath);

    try {
        runGitCommands(basePath, folderName);
    } catch (err) {
        vscode.window.showErrorMessage("Git operation failed. Check terminal & repo setup.");
        return;
    }

    vscode.window.showInformationMessage(
`Published Successfully 
${folderName}`
    );
}
