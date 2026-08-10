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

test("server-renders the complete Clean City Property Care landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Cleaner surfaces\./i);
  assert.match(html, /Stronger first impressions\./i);
  assert.match(html, /Build my free estimate/);
  assert.match(html, /\(702\) 445-8839/);
  assert.match(html, /HOAs &amp; communities/);
  assert.match(html, /Apartments &amp; multifamily/);
  assert.match(html, /Retail, office &amp; hospitality/);
  assert.match(html, /Industrial &amp; loading docks/);
  assert.match(html, /Commercial property care/);
  assert.match(html, /Built for property managers/);
  assert.match(html, /Every high-impact surface/);
  assert.match(html, /Bring back the curb appeal/);
  assert.match(html, /From property details/);
  assert.match(html, /Make the first/);
  assert.match(html, /instagram\.com\/cleancitylv/);
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

test("ships Clean City metadata, real brand assets, mobile actions, and estimate flow", async () => {
  const [page, quoteForm, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/QuoteForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const PHONE_DISPLAY/);
  assert.match(page, /const TEXT_LINK/);
  assert.match(page, /<main id="top">/);
  assert.match(page, /mobile-contact-bar/);
  assert.match(page, /<QuoteForm \/>/);
  assert.match(quoteForm, /window\.location\.href/);
  assert.match(quoteForm, /encodeURIComponent/);
  assert.match(quoteForm, /Free estimate builder/);
  assert.match(quoteForm, /Step \{step\} \/ 3/);
  assert.match(quoteForm, /What type of property needs cleaning\?/);
  assert.match(quoteForm, /Property name or short description/);
  assert.match(quoteForm, /Cleaning scope/);
  assert.match(quoteForm, /Surfaces to clean/);
  assert.match(quoteForm, /Service cadence/);
  assert.match(quoteForm, /Preferred timing/);
  assert.match(quoteForm, /Location \+ contact/);
  assert.match(quoteForm, /Review &amp; text request/);
  assert.match(page, /\/clean-city\/logo\.jpg/);
  assert.match(page, /\/clean-city\/commercial-floor\.jpg/);
  assert.match(layout, /Clean City Property Care — Las Vegas Pressure Washing/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /process\.env\.URL/);
  assert.match(css, /--blue:\s*#1257d6/);
  assert.match(css, /--brand-gradient/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|SkeletonPreview|_sites-preview/);

  await access(new URL("../public/clean-city/logo.jpg", import.meta.url));
  await access(new URL("../public/clean-city/commercial-floor.jpg", import.meta.url));
  await access(new URL("../public/clean-city/industrial-service.jpg", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../dist/client/index.html", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
