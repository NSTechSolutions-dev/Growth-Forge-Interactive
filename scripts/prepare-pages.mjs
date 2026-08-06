import { copyFile, cp, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist/client");
const shellPath = join(clientDir, "_shell.html");

await copyFile(shellPath, join(clientDir, "index.html"));
await copyFile(shellPath, join(clientDir, "404.html"));
await writeFile(join(clientDir, ".nojekyll"), "");

// Keep legacy asset paths working while old HTML is still cached/served.
const legacyDir = join(clientDir, "Growth-Forge-Interactive");
await cp(join(clientDir, "assets"), join(legacyDir, "assets"), { recursive: true });
await copyFile(join(clientDir, "favicon.svg"), join(legacyDir, "favicon.svg"));

console.log("Prepared GitHub Pages artifacts in dist/client");
