import * as path from "path";

export function detectLanguage(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();

    const map: Record<string, string> = {
        ".java": "Java",
        ".py": "Python",
        ".cpp": "C++",
        ".c": "C",
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".go": "Go",
        ".rs": "Rust"
    };

    return map[ext] || "Unknown";
}
