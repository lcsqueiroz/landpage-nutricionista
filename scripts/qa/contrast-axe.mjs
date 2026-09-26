import puppeteer, { KnownDevices } from 'puppeteer-core';
import fs from 'fs';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const BASE = process.env.BASE || 'http://localhost:3000';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const rows = [];
for (const path of ['/', '/politica-de-privacidade', '/nao-existe']) {
  for (const dev of ['iPhone 13', null]) {
    const page = await browser.newPage();
    if (dev) await page.emulate(KnownDevices[dev]); else await page.setViewport({ width: 1440, height: 900 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 90000 });
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
    await new Promise((r) => setTimeout(r, 1500));
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(async () => {
      const r = await axe.run(document, { runOnly: ['color-contrast', 'color-contrast-enhanced'], resultTypes: ['violations', 'incomplete'] });
      const sec = (sel) => { const el = document.querySelector(sel); const s = el?.closest('section,header,footer,[id]'); return s ? (s.id || s.tagName.toLowerCase()) : '?'; };
      const pick = (list, kind) => list.flatMap((v) => v.nodes.map((n) => {
        const d = n.any[0]?.data || {};
        return { kind, rule: v.id, section: sec(n.target[0]), text: (document.querySelector(n.target[0])?.textContent || '').trim().slice(0, 40), ratio: d.contrastRatio, fg: d.fgColor, bg: d.bgColor, size: d.fontSize, weight: d.fontWeight, why: d.messageKey || '', sel: n.target[0].split(' > ').slice(-1)[0] };
      }));
      return [...pick(r.violations, 'FALHA'), ...pick(r.incomplete, 'revisar')];
    });
    res.forEach((x) => rows.push({ page: path, dev: dev ? 'mobile' : 'desktop', ...x }));
    await page.close();
  }
}
await browser.close();

const key = (x) => `${x.kind} ${x.rule === 'color-contrast' ? 'AA ' : 'AAA'} | ${x.page} ${x.section} | ${x.sel.slice(0, 38)} "${x.text}" | ${x.ratio ?? ''} ${x.fg ?? ''}/${x.bg ?? ''} ${x.size ?? ''} ${x.weight ?? ''} ${x.why}`;
const uniq = {}; rows.forEach((x) => { const k = key(x); uniq[k] = (uniq[k] || []).concat(x.dev); });
Object.entries(uniq).sort().forEach(([k, d]) => console.log(k, '[' + [...new Set(d)].join(',') + ']'));
