import * as vscode from "vscode";
import { setupRepository } from "../services/repoSetupService";

export async function changeRepository() {
  const config = vscode.workspace.getConfiguration("codePublisher");

  try {
    const newPath = await setupRepository();

    await config.update(
      "repoPath",
      newPath,
      vscode.ConfigurationTarget.Global
    );

    vscode.window.showInformationMessage(
      "Repository updated successfully"
    );
  } catch (err: any) {
    vscode.window.showErrorMessage(
      err.message || "Failed to change repository"
    );
  }
}
