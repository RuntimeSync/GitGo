import * as vscode from "vscode";
import { publishSolution } from "./commands/publishSolution";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "code-publisher.publishSolution",
    publishSolution
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
