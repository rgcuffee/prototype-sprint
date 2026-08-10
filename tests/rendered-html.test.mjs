import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete DLS Mobile Detailing landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Precision detailing, <em>delivered\.<\/em>/);
  assert.match(html, /San Fernando Valley · Mobile detailing/);
  assert.match(html, /Text Rudy for a quote/);
  assert.match(html, /\(818\) 808-7830/);
  assert.match(html, /Paint correction/);
  assert.match(html, /Ceramic coating/);
  assert.match(html, /Headlight restoration/);
  assert.match(html, /Engine bay cleaning/);
  assert.match(html, /Proof lives in the reflection\./);
  assert.match(html, /Simple to book\. Personal from start to finish\./);
  assert.match(html, /Rudy De Los Santos/);
  assert.match(html, /@dls_mobiledetailing_/);
  assert.match(html, /Let&#x27;s get your car looking right\./);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the existing prototype utility routes available", async () => {
  const [checklistsResponse, thanksResponse, yardVisionResponse] = await Promise.all([
    render("/checklists"),
    render("/thanks"),
    render("/yard-vision"),
  ]);

  assert.equal(checklistsResponse.status, 200);
  assert.equal(thanksResponse.status, 200);
  assert.equal(yardVisionResponse.status, 200);
});

test("ships DLS metadata, social imagery, mobile actions, and responsive styles", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const PHONE_DISPLAY/);
  assert.match(page, /const TEXT_LINK/);
  assert.match(page, /<main id="top">/);
  assert.match(page, /mobile-contact-bar/);
  assert.match(layout, /DLS Mobile Detailing — San Fernando Valley/);
  assert.match(layout, /\/og-dls\.png/);
  assert.match(layout, /process\.env\.URL/);
  assert.match(css, /--gold:\s*#d5a64a/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|SkeletonPreview|_sites-preview/);

  await access(new URL("../public/og-dls.png", import.meta.url));
  await access(new URL("../public/dls/logo.jpg", import.meta.url));
  await access(new URL("../public/dls/hero-rolls.jpg", import.meta.url));
  await access(new URL("../dist/client/index.html", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
