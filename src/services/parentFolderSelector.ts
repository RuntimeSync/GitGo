import * as vscode from "vscode";
import * as fs from "fs";

const CONFIG_KEY = "lastParentFolder";

interface FolderOption {
  label: string;
  value: string | null;
}

export async function selectParentFolder(
  repoPath: string
): Promise<string | null> {

  const config = vscode.workspace.getConfiguration("gitgo");
  const lastUsed = config.get<string>(CONFIG_KEY);

  const entries = fs.readdirSync(repoPath, { withFileTypes: true });

  const folders = entries
    .filter(e => e.isDirectory())
    .map(e => e.name);

  const options: FolderOption[] = [
    { label: "Use Repository Root", value: null },
    ...folders.map(f => ({ label: f, value: f })),
    { label: "+ Create New Folder", value: "__create__" }
  ];

  const choice = await vscode.window.showQuickPick(options, {
    placeHolder: lastUsed
      ? `Last used: ${lastUsed}`
      : "Select parent folder"
  });

  if (!choice) {
    throw new Error("Parent folder not selected");
  }

  let selected: string | null;

  if (choice.value === "__create__") {

    const name = await vscode.window.showInputBox({
      prompt: "Enter new parent folder name"
    });

    if (!name) {
      throw new Error("Folder name required");
    }

    selected = name.trim();

  } else {
    selected = choice.value;
  }

  await config.update(
    CONFIG_KEY,
    selected,
    vscode.ConfigurationTarget.Global
  );

  return selected;
}
