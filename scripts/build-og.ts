import satori from "satori";
import sharp from "sharp";
import { createElement } from "react";
import fs from "fs";
import OGImage from "../src/og/OGImage";

const inter = new URL(
  import.meta.resolve("@fontsource/inter/files/inter-latin-400-normal.woff2"),
);

const svg = await satori(createElement(OGImage), {
  width: 600,
  height: 400,
  fonts: [
    {
      name: "Inter",
      data: fs.readFileSync(inter),
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: fs.readFileSync(
        new URL(
          import.meta
            .resolve("@fontsource/inter/files/inter-latin-700-normal.woff2"),
        ),
      ),
      weight: 700,
      style: "normal",
    },
  ],
});

const png = await sharp(Buffer.from(svg), { density: 144 }).png().toBuffer();
fs.writeFileSync("./public/og.png", png);
