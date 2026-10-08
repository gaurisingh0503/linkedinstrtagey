const { openBrowser } = require("@remotion/renderer");
const { readFileSync } = require("node:fs");
const { load } = require("./load-ts.cjs");
const { features } = load("src/data/features.ts");
const { animation } = load("src/shipping/config.ts");
(async () => {
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/chromium",
  });
  try {
    const page = await browser.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: null,
      onLog: () => {},
    });
    const encoded = readFileSync(
      "public/assets/inter-latin-600-normal.woff2",
    ).toString("base64");
    const widths = await page.evaluate(
      async (fontData, titles, fontSize) => {
        const font = new FontFace(
          "Inter",
          `url(data:font/woff2;base64,${fontData})`,
          { weight: "600" },
        );
        await font.load();
        document.fonts.add(font);
        const c = document.createElement("canvas").getContext("2d");
        c.font = `600 ${fontSize}px Inter`;
        return titles.map((title) => ({
          title,
          width: c.measureText(title + " shipped").width,
        }));
      },
      encoded,
      features.map((f) => f.shortTitle ?? f.title),
      animation.titleFontSize,
    );
    widths.sort((a, b) => b.width - a.width);
    console.log(
      JSON.stringify({ available: 574, widest: widths.slice(0, 6) }, null, 2),
    );
    if (widths.some((w) => w.width > 574)) process.exitCode = 1;
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
