#  GitGo — One-Command Solution Publisher for VS Code

GitGo is a VS Code extension that publishes solved coding problems to GitHub using a single command by automating folder creation, README generation, screenshot handling, and Git operations.

> Write Code → Run **Publish Solution** → Done.

---

## ❓ Problem

Developers who regularly solve coding problems and maintain GitHub repositories must manually:

- Create problem folders  
- Decide naming conventions  
- Copy and rename solution files  
- Write README files  
- Add screenshots  
- Run git commands  
- Create branches and pull requests  

Because this workflow is long and repetitive:

- Repositories become inconsistent  
- Folder structures become messy  
- Developers stop documenting  
- Solutions remain unpublished  

### Root Cause

Publishing a solution is treated as many independent steps instead of a single atomic operation.

---

## ✅ Solution

GitGo converts solution publishing into one atomic pipeline executed by a single command.

Everything required to publish a solution is handled automatically.

No terminal usage.  
No manual file handling.  
No README writing.  
No git commands.

---

## 🎯 Target Users

- DSA / LeetCode practitioners  
- Interview preparation students  
- Developers maintaining solution repositories  

---

## 🧠 Core Design Principle

**One Command = One Complete Publish Pipeline**

Either everything succeeds or nothing is written.

---

## 🔁 User Workflow

1. Write solution code  
2. Run `Publish Solution` command  
3. Select problem type (LeetCode / Normal)  
4. If LeetCode, provide difficulty and execution time  
5. Select repository (first run only)  
6. Choose parent folder  
7. Enter problem folder name  

GitGo automatically handles the rest.

---

## 🏗 Architecture

GitGo uses a modular service-based architecture:

- Language detection  
- Filename standardization  
- Problem type handling  
- Metadata prompts  
- Folder creation  
- File copying  
- README generation  
- Screenshot handling  
- Repository setup  
- Default branch detection  
- Git automation  
- PR description generation  

Each module has a single responsibility.

---

## 🛠 Tech Stack

- TypeScript  
- VS Code Extension API  
- Node.js  
- esbuild  
- Git CLI  
- Node core modules  

No backend.  
No database.  
No cloud services.  
No GitHub API.

---

## 📁 Folder Structure Generated

Each published problem produces:

- One solution file  
- One README  
- One test case screenshot  
- One submission screenshot  

This structure is consistent across all problems.

---

## 📏 Standardized Filenames

Regardless of original filename, solutions are renamed to a consistent format to guarantee uniformity across the repository.

---

## 📝 README Generation

### LeetCode Problems

Generated README contains:

- Problem name  
- Programming language  
- Difficulty  
- Execution time  
- Code explanation  
- Concepts used  
- Screenshots  
- File information  
- Author  

### Normal Problems

Generated README contains:

- Problem name  
- Short description  
- Files  
- Screenshot  
- Author  

---

## 🔄 Git Automation

GitGo supports two publishing modes:

### Normal Push

Solution is committed and pushed directly to the default branch.

### Pull Request Mode

GitGo creates a new branch, commits the solution, pushes it, and opens a pull request automatically.

---

## 🌿 Default Branch Detection

GitGo automatically detects the repository’s default branch, even if it is not named `main` or `master`.

---

## ⚙ Settings

User configurable:

- Author name  
- GitHub URL  
- LinkedIn URL  
- Default push mode  
- Default problem type  
- Repository path  

---

## 🧠 Memory Features

GitGo remembers:

- Repository path  
- Author details  
- Last used parent folder  

No repeated setup.

---

## 🛡 Error Handling

- All operations executed through safe wrappers  
- Friendly error messages  
- Automatic rollback on failure  
- No partial publishes  

---

## 🔐 Security

- No credentials stored  
- Uses existing git authentication  
- No GitHub API usage  

---

## 📌 Project Status

- Core pipeline complete  
- Settings UI complete  
- Memory features implemented  
- Error guarding implemented  
- Ready for Marketplace packaging  

---

## 👥 Authors

- Sujal Patil  
- Shreya Awari  
- Tejas Halvankar  
- Nihal Mishra  

---

## 📄 Resume Line

Built a VS Code extension that automates end-to-end publishing of coding solutions to GitHub with one command, including folder creation, README generation, screenshot handling, git automation, and pull-request generation.
