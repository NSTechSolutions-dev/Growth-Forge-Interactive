import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist/client");
const shellPath = join(clientDir, "_shell.html");

await copyFile(shellPath, join(clientDir, "index.html"));
await copyFile(shellPath, join(clientDir, "404.html"));
await writeFile(join(clientDir, ".nojekyll"), "");

console.log("Prepared GitHub Pages artifacts in dist/client");
