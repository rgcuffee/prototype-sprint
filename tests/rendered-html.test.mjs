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

test("server-renders the complete Proto Sprint landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /From idea to something <em>real<\/em> in one focused session\./);
  assert.match(html, /Live · Collaborative · AI-assisted/);
  assert.match(html, /Book a Free Fit Call/);
  assert.match(html, /Request a \$500 Sprint/);
  assert.match(html, /Working prototype/);
  assert.match(html, /Choose what matters most\./);
  assert.match(html, /Proto Sprint<\/h3><span>3 hours<\/span>/);
  assert.match(html, /Want to leave with something live\?/);
  assert.match(html, /You own what we build\./);
  assert.match(html, /<details/);
  assert.match(html, /Is a deployed prototype guaranteed\?/);
  assert.match(html, /A target—not a guaranteed bundle\./);
  assert.match(html, /Choose\. Prepare\. Build\./);
  assert.match(html, /Confirm fit &amp; prepare/);
  assert.match(html, /name="prototype-sprint-inquiry"/);
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /What would make the first sprint a win\?/);
  assert.match(html, /Potentially \$0 per month at prototype scale/);
  assert.match(html, /client-owned Google Drive folder/);
  assert.match(html, /name="handoff-drive"/);
  assert.match(html, /Documentation &amp; handoff/);
  assert.match(html, /name="start-path"/);
  assert.match(html, /Free 15-minute Sprint Fit Call/);
  assert.match(html, /Direct \$500 Proto Sprint request/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("publishes interactive offering checklists and a form success page", async () => {
  const [checklistsResponse, thanksResponse] = await Promise.all([
    render("/checklists"),
    render("/thanks"),
  ]);

  assert.equal(checklistsResponse.status, 200);
  const checklists = await checklistsResponse.text();
  assert.match(checklists, /Come ready to <em>build\.<\/em>/);
  assert.match(checklists, /Proto Sprint/);
  assert.match(checklists, /Landing Page Sprint/);
  assert.match(checklists, /Brand Starter/);
  assert.match(checklists, /Social Launch Kit/);
  assert.match(checklists, /Progress saves automatically on this device/);
  assert.match(checklists, /Shared Drive &amp; handoff/);
  assert.match(checklists, /Client-owned Google Drive folder created/);
  assert.match(checklists, /Book a free fit call/);

  assert.equal(thanksResponse.status, 200);
  const thanks = await thanksResponse.text();
  assert.match(thanks, /Sprint request received/);
  assert.match(thanks, /Start the readiness checklist/);
});

test("removes starter artifacts and keeps product metadata and responsive styles", async () => {
  const [page, layout, css, packageJson, netlifyForm, checklistClient, nextConfig, netlifyConfig, formSubmitClient] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/netlify-form.html", import.meta.url), "utf8"),
    readFile(new URL("../app/checklists/ChecklistHub.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
    readFile(new URL("../app/NetlifyFormSubmit.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const FIT_CALL_URL/);
  assert.match(page, /const SPRINT_REQUEST_URL/);
  assert.match(page, /<main id="top">/);
  assert.match(page, /<summary>/);
  assert.match(layout, /Proto Sprint — From idea to something real/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /process\.env\.URL/);
  assert.match(css, /--orange:\s*#cf5423/);
  assert.match(css, /@media \(max-width: 590px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|SkeletonPreview|_sites-preview/);
  assert.match(netlifyForm, /data-netlify="true"/);
  assert.match(netlifyForm, /name="form-name" value="prototype-sprint-inquiry"/);
  assert.match(netlifyForm, /name="sprint-win"/);
  assert.match(netlifyForm, /name="handoff-drive"/);
  assert.match(netlifyForm, /name="start-path"/);
  assert.match(netlifyForm, /action="\/thanks\/"/);
  assert.match(checklistClient, /Shared Drive & handoff/);
  assert.match(checklistClient, /window\.localStorage/);
  assert.match(checklistClient, /window\.print\(\)/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(netlifyConfig, /publish = "dist\/client"/);
  assert.match(netlifyConfig, /from = "\/thank"/);
  assert.match(netlifyConfig, /from = "\/thank\/"/);
  assert.match(formSubmitClient, /fetch\("\/"/);
  assert.match(formSubmitClient, /application\/x-www-form-urlencoded/);
  assert.match(formSubmitClient, /window\.location\.assign\("\/thanks\/"\)/);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/client/checklists.html", import.meta.url));
  await access(new URL("../dist/client/thanks.html", import.meta.url));
  await access(new URL("../dist/client/netlify-form.html", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
