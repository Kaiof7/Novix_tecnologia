// Captura um site real em 375px e 1440px e salva WebP otimizado em public/portfolio/.
// Uso: node scripts/capture-portfolio.mjs <slug> <url>
// Chrome: defina CHROME_PATH se não estiver no caminho padrão do Windows.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const [slug, url] = process.argv.slice(2);
if (!slug || !/^[a-z0-9-]+$/.test(slug) || !url?.startsWith("https://")) {
  console.error("Uso: node scripts/capture-portfolio.mjs <slug> <https://url>");
  process.exit(1);
}

const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sizes = [
  { name: "1440", width: 1440, height: 900, out: 1200 },
  { name: "375", width: 375, height: 760, out: 375 },
];
const outDir = join(import.meta.dirname, "..", "public", "portfolio");
mkdirSync(outDir, { recursive: true });

for (const size of sizes) {
  const png = join(tmpdir(), `capture-${slug}-${size.name}.png`);
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${size.width},${size.height}`,
    "--virtual-time-budget=10000",
    `--screenshot=${png}`,
    url,
  ], { stdio: "ignore" });
  const file = join(outDir, `${slug}-${size.name}.webp`);
  await sharp(png).resize({ width: size.out }).webp({ quality: 78 }).toFile(file);
  rmSync(png);
  console.log(file);
}
