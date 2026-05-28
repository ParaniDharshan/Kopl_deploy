import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const folders = [
  "src/assets/Events/Annual Conference",
  "src/assets/Events/Inaugration",
  "src/assets/Events/Essex Visit",
  "src/assets/Office",
  "src/assets/Our Team",
];

for (const folder of folders) {
  if (!existsSync(folder)) { console.log(`Skipping (not found): ${folder}`); continue; }

  const files = readdirSync(folder).filter(f =>
    [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"].includes(extname(f))
  );

  for (const file of files) {
    const input = join(folder, file);
    const output = join(folder, basename(file, extname(file)) + ".webp");
    await sharp(input).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output);
    console.log(`✓ ${file} → ${basename(output)}`);
  }
}
console.log("Done! All images compressed to WebP.");