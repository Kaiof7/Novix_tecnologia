// Gera os ícones e a imagem de compartilhamento a partir dos arquivos da logo.
// Uso: node scripts/brand-assets.mjs   (CHROME_PATH opcional)
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
const assets = join(import.meta.dirname, "assets");
const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

// Ícone 180px (apple-touch-icon): fundo cheio, sem cantos, como pede o iOS.
await sharp(join(assets, "novix-foto-perfil.svg"), { density: 600 })
  .resize(180, 180)
  .png()
  .toFile(join(root, "src", "app", "apple-icon.png"));

// Imagem de compartilhamento 1200x630.
const png = join(tmpdir(), "novix-og.png");
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--window-size=1200,630", "--virtual-time-budget=8000", `--screenshot=${png}`,
  pathToFileURL(join(assets, "og.html")).href,
], { stdio: "ignore" });
await sharp(png).png({ compressionLevel: 9, palette: true }).toFile(join(root, "public", "og.png"));
rmSync(png);
console.log("ok: src/app/apple-icon.png, public/og.png");
