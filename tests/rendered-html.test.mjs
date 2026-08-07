import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the complete Prototype Sprint landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /From idea to something <em>real<\/em> in one focused session\./);
  assert.match(html, /Live · Collaborative · AI-assisted/);
  assert.match(html, /Book a Prototype Sprint/);
  assert.match(html, /Working prototype/);
  assert.match(html, /Choose what matters most\./);
  assert.match(html, /Prototype Sprint<\/h3><span>3 hours<\/span>/);
  assert.match(html, /Want to leave with something live\?/);
  assert.match(html, /You own what we build\./);
  assert.match(html, /<details/);
  assert.match(html, /Is a deployed prototype guaranteed\?/);
  assert.match(html, /A target—not a guaranteed bundle\./);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("removes starter artifacts and keeps product metadata and responsive styles", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const BOOKING_URL/);
  assert.match(page, /<main id="top">/);
  assert.match(page, /<summary>/);
  assert.match(layout, /Prototype Sprint — From idea to something real/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(css, /--orange:\s*#cf5423/);
  assert.match(css, /@media \(max-width: 590px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|SkeletonPreview|_sites-preview/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
