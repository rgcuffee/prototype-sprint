import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "site");
const client = path.join(root, "dist", "client");
const server = path.join(root, "dist", "server");
const hostingSource = path.join(root, ".openai", "hosting.json");
const hostingOutput = path.join(root, "dist", ".openai", "hosting.json");

await rm(client, { recursive: true, force: true });
await rm(server, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await mkdir(path.dirname(hostingOutput), { recursive: true });
await cp(source, client, { recursive: true });
await writeFile(
  path.join(server, "index.js"),
  "export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };\n",
);

const hosting = JSON.parse(await readFile(hostingSource, "utf8"));
await writeFile(hostingOutput, `${JSON.stringify(hosting, null, 2)}\n`);

console.log("Static Mercury site built in dist/client");
