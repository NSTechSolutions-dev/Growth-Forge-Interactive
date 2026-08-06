import { copyFile, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist/client");
const shellPath = join(clientDir, "_shell.html");

await copyFile(shellPath, join(clientDir, "index.html"));
await copyFile(shellPath, join(clientDir, "404.html"));
await writeFile(join(clientDir, ".nojekyll"), "");
await copyFile(join(process.cwd(), "public/CNAME"), join(clientDir, "CNAME"));

for (const file of ["index.html", "404.html", "_shell.html"]) {
  const filePath = join(clientDir, file);
  const html = await readFile(filePath, "utf8");
  await writeFile(filePath, html.replaceAll("/Growth-Forge-Interactive/", "/"));
}

console.log("Prepared GitHub Pages artifacts in dist/client");
