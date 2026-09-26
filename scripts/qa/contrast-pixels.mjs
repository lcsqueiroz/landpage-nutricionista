// Contraste real: cor do texto x pixels do fundo renderizado (com o texto oculto)
import puppeteer from 'puppeteer-core';
import { PNG } from 'pngjs';
import fs from 'fs';
const BASE = process.env.BASE || 'http://localhost:3000';
const PATHS = (process.env.PATHS || '/,/politica-de-privacidade,/nao-existe').split(',');
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const all = [];
for (const path of PATHS) for (const [dev, w, h, mobile] of [['mobile', 390, 844, true], ['desktop', 1440, 900, false]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 90000 });
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
  await new Promise((r) => setTimeout(r, 1200));
  const items = await page.evaluate(() => {
    const parse = (s) => { const m = s.match(/[\d.]+/g).map(Number); const k = s.startsWith('color(') ? 255 : 1; return { rgb: m.slice(0, 3).map((v) => v * k), a: m[3] ?? 1 }; };
    window.__cc = [];
    const out = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (w.nextNode()) {
      const t = w.currentNode; const el = t.parentElement;
      if (!t.textContent.trim() || seen.has(el) || el.closest('script,style,noscript,[hidden]')) continue;
      seen.add(el);
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none') continue;
      const range = document.createRange(); range.selectNodeContents(t);
      const r = range.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
      if (op < 0.02) continue;
      const c = parse(s.color);
      const sec = el.closest('section,header,footer,nav,main > *');
      let fixed = false; for (let e = el; e; e = e.parentElement) if (getComputedStyle(e).position === 'fixed') fixed = true;
      window.__cc.push(t);
      out.push({ idx: window.__cc.length - 1, text: t.textContent.trim().replace(/\s+/g, ' ').slice(0, 42), cls: (el.className?.toString?.() || el.tagName).split(' ')[0].replace(/-module__\w+__/, '.'), sec: sec ? (sec.id || sec.tagName.toLowerCase()) : '?',
        fixed, x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, fg: c.rgb, a: c.a * op, size: parseFloat(s.fontSize), weight: +s.fontWeight });
    }
    return out;
  });
  await page.addStyleTag({ content: '*, *::before, *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; caret-color: transparent !important; } svg, [class*="icon"], [class*="Icon"] { opacity: 1; }' });
  await new Promise((r) => setTimeout(r, 300));
  const [W, H] = await page.evaluate(() => [innerWidth, innerHeight]);
  const jobs = items.flatMap((it) => it.fixed ? [{ it, scroll: 0, tag: '' }, { it, scroll: 1600, tag: ' (rolado)' }] : [{ it, scroll: Math.max(0, it.y + it.h / 2 - H / 2), tag: '' }]);
  for (const { it, scroll, tag } of jobs) {
    // Rola além e volta: o header some ao descer e reaparece ao subir
    await page.evaluate((y) => scrollTo(0, y + 300), scroll);
    await new Promise((r) => setTimeout(r, 60));
    await page.evaluate((y) => scrollTo(0, y), scroll);
    await new Promise((r) => setTimeout(r, it.fixed ? 900 : 80));
    let live = await page.evaluate((i) => { const rg = document.createRange(); rg.selectNodeContents(window.__cc[i]); const b = rg.getBoundingClientRect(); const el = window.__cc[i].parentElement; const hit = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return { x: b.left, y: b.top, w: b.width, h: b.height, sy: scrollY, covered: !!hit && !el.contains(hit) && !hit.contains(el) }; }, it.idx);
    // Coberto por outro elemento (ex.: cards empilhados): tenta com o elemento no topo da tela
    if (live.covered && !it.fixed) {
      await page.evaluate((i) => { const el = window.__cc[i].parentElement; el.scrollIntoView({ block: 'end', behavior: 'instant' }); }, it.idx);
      await new Promise((r) => setTimeout(r, 120));
      live = await page.evaluate((i) => { const rg = document.createRange(); rg.selectNodeContents(window.__cc[i]); const b = rg.getBoundingClientRect(); const el = window.__cc[i].parentElement; const hit = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return { x: b.left, y: b.top, w: b.width, h: b.height, sy: scrollY, covered: !!hit && !el.contains(hit) && !hit.contains(el) }; }, it.idx);
      if (live.covered) { all.push({ path, dev, ...it, ratio: null, aa: true, aaa: true, covered: true }); continue; }
    }
    const sy = live.sy;
    const vy = live.y;
    it.x = live.x; it.w = live.w; it.h = live.h;
    // clip do Puppeteer é relativo ao documento
    const top = Math.max(0, vy), bottom = Math.min(H, vy + it.h);
    const left = Math.max(0, it.x), right = Math.min(W, it.x + it.w);
    const clip = { x: left, y: sy + top, width: right - left, height: bottom - top };
    if (clip.height < 2 || clip.width < 2) continue;
    const png = PNG.sync.read(await page.screenshot({ clip, captureBeyondViewport: false }));
    const ratios = [];
    const step = Math.max(1, Math.floor(Math.sqrt((png.width * png.height) / 1500)));
    for (let y = 0; y < png.height; y += step) for (let x = 0; x < png.width; x += step) {
      const i = (y * png.width + x) * 4; const bg = [png.data[i], png.data[i + 1], png.data[i + 2]];
      const fg = it.fg.map((c, k) => c * it.a + bg[k] * (1 - it.a));
      ratios.push(ratio(fg, bg));
    }
    ratios.sort((a, b) => a - b);
    const r = ratios[Math.floor(ratios.length * 0.1)];
    const large = it.size >= 24 || (it.size >= 18.66 && it.weight >= 700);
    all.push({ path, dev, ...it, text: it.text + tag, ratio: +r.toFixed(2), large, aa: r >= (large ? 3 : 4.5), aaa: r >= (large ? 4.5 : 7) });
  }
  await page.close();
}
await browser.close();

const bad = all.filter((x) => !x.aaa);
const g = {}; bad.forEach((x) => { const k = `${x.aa ? 'só AA ' : 'FALHA '} ${x.path} ${x.sec.padEnd(14)} ${x.cls.slice(0, 34).padEnd(34)} ${String(x.ratio).padEnd(5)} ${x.large ? 'grande' : 'normal'} "${x.text}"`; g[k] = [...new Set([...(g[k] || []), x.dev])]; });
Object.keys(g).sort().forEach((k) => console.log(k, g[k].join(',')));
console.log(`\n${all.length} textos · AA: ${all.filter((x) => x.aa).length} · AAA: ${all.filter((x) => x.aaa).length}`);
