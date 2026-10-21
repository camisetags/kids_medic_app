const input = process.argv[2];
if (!input) throw new Error('Informe a URL publicada.');
const root = new URL(input.endsWith('/') ? input : `${input}/`);
async function readResource(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const text = /text|javascript|json/.test(response.headers.get('content-type') ?? '') ? await response.text() : '';
  return { url, text };
}
function localLinks(text, base) {
  const html = [...text.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map((item) => item[1]);
  const css = [...text.matchAll(/url\((?:"([^"]*)"|'([^']*)'|([^ )]+))\)/g)].map((item) => item[1] ?? item[2] ?? item[3]);
  return [...html, ...css].filter((value) => !value.startsWith('data:') && !value.startsWith('#')).map((value) => new URL(value, base)).filter((url) => url.origin === root.origin);
}

const entry = await readResource(root);
if (!entry.text.includes('id="root"')) throw new Error('Página publicada não corresponde à aplicação.');
const resources = await Promise.all(localLinks(entry.text, root).map(readResource));
for (const resource of resources) {
  if (resource.url.pathname.endsWith('.css')) await Promise.all(localLinks(resource.text, resource.url).map(readResource));
}
await readResource(new URL('art/care-journey.svg', root));
console.log(`Página, scripts, estilos, fontes e ilustração verificados: ${root}`);
