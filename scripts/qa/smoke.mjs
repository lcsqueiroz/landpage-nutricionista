import puppeteer, { KnownDevices } from 'puppeteer-core';

const BASE = process.env.BASE || 'http://localhost:3123';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const ok = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

async function audit(path, { device, width = 1440 } = {}) {
  const page = await browser.newPage();
  if (device) await page.emulate(KnownDevices[device]);
  else await page.setViewport({ width, height: 900 });

  const consoleErrors = [];
  const failed = [];
  // Scripts do Vercel Analytics só existem na Vercel: 404 local é esperado
  const vercelOnly = (t) => /_vercel\/|status of 404/.test(t);
  page.on('console', (m) => m.type() === 'error' && !vercelOnly(m.text() + (m.location()?.url || '')) && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => !r.url().includes('/_vercel/') && failed.push(`${r.failure()?.errorText} ${r.url()}`));
  page.on('response', (r) => {
    const u = r.url();
    // Analytics só existe na Vercel: 404 local é esperado
    if (r.status() >= 400 && !u.includes('/_vercel/') && u !== BASE + path) failed.push(`${r.status()} ${u}`);
  });
  await page.evaluateOnNewDocument(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) =>
      window.__csp.push(`${e.violatedDirective} ${e.blockedURI}`)
    );
  });

  const resp = await page.goto(BASE + path, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await sleep(800);

  const info = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
    const anchors = [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h !== '#' && !document.getElementById(h.slice(1)));
    const imgsNoAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length;
    const blankNoRel = [...document.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !/noopener/.test(a.rel)).map((a) => a.href);
    const wa = [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href);
    const waBad = wa.filter((h) => /wa\.me\/(undefined|\?)/.test(h));
    let jsonld = 'ausente';
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld) { try { JSON.parse(ld.textContent); jsonld = 'válido'; } catch { jsonld = 'INVÁLIDO'; } }
    const small = [...document.querySelectorAll('a, button')].filter((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || r.width === 0) return false;
      if (el.closest('p, li p, .text, [class*="bio"]')) return false; // links dentro de texto corrido
      return r.width < 44 || r.height < 44;
    }).map((el) => `${el.tagName} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
    return {
      h1: document.querySelectorAll('h1').length,
      lang: document.documentElement.lang,
      title: document.title,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      dupIds, anchors, imgsNoAlt, blankNoRel, waCount: wa.length, waBad, jsonld, small,
      csp: window.__csp,
    };
  });
  const headers = resp.headers();
  await page.close();
  return { status: resp.status(), headers, consoleErrors, failed, ...info };
}

const tag = (p, d) => `${p}${d ? ` [${d}]` : ' [desktop]'}`;
for (const [path, device] of [['/', null], ['/', 'iPhone 13'], ['/politica-de-privacidade', null], ['/pagina-que-nao-existe', null]]) {
  const r = await audit(path, { device });
  const t = tag(path, device);
  const expected = path === '/pagina-que-nao-existe' ? 404 : 200;
  ok(`${t} status HTTP ${expected}`, r.status === expected || (expected === 200 && r.status === 304), `recebido ${r.status}`);
  ok(`${t} sem erros no console`, r.consoleErrors.length === 0, r.consoleErrors.join(' | '));
  ok(`${t} sem requisições com falha`, r.failed.length === 0, r.failed.join(' | '));
  ok(`${t} sem violações de CSP`, r.csp.length === 0, r.csp.join(' | '));
  ok(`${t} exatamente 1 <h1>`, r.h1 === 1, `h1=${r.h1}`);
  ok(`${t} lang="pt-BR" e <title>`, r.lang === 'pt-BR' && !!r.title, `${r.lang} · ${r.title}`);
  ok(`${t} sem ids duplicados`, r.dupIds.length === 0, r.dupIds.join(', '));
  ok(`${t} âncoras internas válidas`, r.anchors.length === 0, r.anchors.join(', '));
  ok(`${t} imagens com alt`, r.imgsNoAlt === 0, `${r.imgsNoAlt} sem alt`);
  ok(`${t} target=_blank com noopener`, r.blankNoRel.length === 0, r.blankNoRel.join(', '));
  ok(`${t} JSON-LD`, r.jsonld === 'válido', r.jsonld);
  ok(`${t} sem rolagem horizontal`, !r.overflowX);
  if (r.waCount) ok(`${t} links do WhatsApp com número (${r.waCount})`, r.waBad.length === 0, r.waBad[0] || '');
  ok(`${t} alvos de toque ≥ 44px`, r.small.length === 0, r.small.slice(0, 6).join(' | '));
  if (path === '/' && !device) {
    const h = r.headers;
    for (const k of ['content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'strict-transport-security']) {
      ok(`cabeçalho ${k}`, !!h[k], h[k] ? '' : 'ausente');
    }
    ok('sem cabeçalho x-powered-by', !h['x-powered-by'], h['x-powered-by'] || '');
  }
}

for (const u of ['/sitemap.xml', '/robots.txt', '/opengraph-image.jpg', '/icon.png', '/apple-icon.png', '/favicon.ico', '/logo/script.svg']) {
  const res = await fetch(BASE + u);
  ok(`GET ${u}`, res.status === 200, `${res.status} ${res.headers.get('content-type')}`);
}

await browser.close();
const fails = results.filter((r) => !r.pass);
for (const r of results) console.log(`${r.pass ? 'OK  ' : 'FALHA'} ${r.name}${!r.pass && r.detail ? `  →  ${r.detail}` : ''}`);
console.log(`\n${results.length - fails.length}/${results.length} verificações ok`);
