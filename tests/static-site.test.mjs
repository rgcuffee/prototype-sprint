import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);

test("builds a complete static Mercury Cleaning Services page", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");
  assert.match(html, /One call\./i);
  assert.match(html, /We’ll clean it all\./i);
  assert.match(html, /Janitorial &amp; porter services/i);
  assert.match(html, /Property maintenance/i);
  assert.match(html, /Special event services/i);
  assert.match(html, /Alvin Peralta/i);
  assert.match(html, /\(702\) 272-2278/);
  assert.match(html, /LocalBusiness/);
  assert.match(html, /mercurycleaningservices\.com/);
});

test("ships a Netlify-detectable quote form and confirmation page", async () => {
  const [html, thanks] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("thanks.html", root), "utf8"),
  ]);
  assert.match(html, /name="quote-request"/);
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /name="form-name" value="quote-request"/);
  assert.match(html, /netlify-honeypot="bot-field"/);
  assert.match(html, /action="\/thanks\.html"/);
  assert.match(thanks, /Request received/);
});

test("includes responsive styling, SEO files, and local brand assets", async () => {
  const css = await readFile(new URL("styles.css", root), "utf8");
  assert.match(css, /--green:\s*#79ba43/i);
  assert.match(css, /--cream:\s*#faf8f1/i);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion/);
  await Promise.all([
    access(new URL("robots.txt", root)),
    access(new URL("sitemap.xml", root)),
    access(new URL("assets/brand/logo-white.png", root)),
    access(new URL("assets/photos/hero.jpg", root)),
    access(new URL("../server/index.js", root)),
  ]);
});
