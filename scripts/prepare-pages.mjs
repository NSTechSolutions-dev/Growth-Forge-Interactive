import { copyFile, cp, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist/client");
const shellPath = join(clientDir, "_shell.html");

await copyFile(shellPath, join(clientDir, "index.html"));
await copyFile(shellPath, join(clientDir, "404.html"));
await writeFile(join(clientDir, ".nojekyll"), "");

for (const file of ["index.html", "404.html", "_shell.html"]) {
  const filePath = join(clientDir, file);
  const html = await readFile(filePath, "utf8");
  await writeFile(filePath, html.replaceAll("/Growth-Forge-Interactive/", "/"));
}

const legacyDir = join(clientDir, "Growth-Forge-Interactive");
await cp(join(clientDir, "assets"), join(legacyDir, "assets"), { recursive: true });
await copyFile(join(clientDir, "favicon.svg"), join(legacyDir, "favicon.svg"));

const legacyAssetBase = process.env.LEGACY_ASSET_BASE_URL ?? "https://myleadfoundry.com/assets";
const legacyBundles = ["index-a4izTrnP.js", "routes-D8WRB7gF.js", "styles-Dxwcaxmg.css"];

for (const bundle of legacyBundles) {
  try {
    const response = await fetch(`${legacyAssetBase}/${bundle}`);
    if (response.ok) {
      await writeFile(join(legacyDir, "assets", bundle), Buffer.from(await response.arrayBuffer()));
    }
  } catch {
    // Skip when bootstrapping a fresh environment.
  }
}

console.log("Prepared GitHub Pages artifacts in dist/client");
