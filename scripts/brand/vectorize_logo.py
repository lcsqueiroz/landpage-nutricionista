"""Vetoriza a logo horizontal (docs/brand) em máscaras SVG por camada para public/logo."""
import os
from pathlib import Path

import numpy as np
import potrace
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'docs' / 'brand' / 'logo-horizontal-original.jpg'
OUT = ROOT / 'public' / 'logo'
SCALE = 3


def clean(mask, size=3):
    img = Image.fromarray((mask * 255).astype('uint8')).filter(ImageFilter.MedianFilter(size))
    return np.asarray(img) > 127


def convex_hull(points):
    pts = sorted(set(map(tuple, points)))

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lower, upper = [], []
    for q in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], q) <= 0:
            lower.pop()
        lower.append(q)
    for q in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], q) <= 0:
            upper.pop()
        upper.append(q)
    return lower[:-1] + upper[:-1]


def main():
    im = Image.open(SOURCE).convert('RGB')
    im = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.7))
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(axis=2), a.min(axis=2)
    h, w = mx.shape

    # Classificação por cor: rosa (assinatura/polpa), verde (casca/folhas), escuro (sementes)
    seed = mx < 110
    pink = (r - g > 28) & (r > 150) & ~seed
    strict = (g - r > 3) & (g >= b - 2) & (mx - mn > 10) & (mn < 232)
    relaxed = (g - r > 2) & (g >= b - 3) & (mx - mn > 7) & (mn < 240)
    leaf_zone = np.zeros_like(seed)
    leaf_zone[int(h * 0.22):int(h * 0.52), int(w * 0.78):int(w * 0.92)] = True
    green = (strict | (relaxed & leaf_zone)) & ~seed & ~pink

    layers = {'script': clean(pink), 'detail': clean(green)}

    # "NUTRICIONISTA" fica fora do traçado: vira texto real no componente Logo
    text_top = np.where(layers['script'].any(axis=1))[0].max() + 4 * SCALE
    layers['detail'][text_top:, :] = False

    # Polpa = rosa dentro da zona da casca + sementes (expandida até a borda da fatia)
    melon_zone = np.zeros_like(seed)
    melon_zone[int(h * 0.30):int(h * 0.80), int(w * 0.76):] = True
    rind = layers['detail'] & ~leaf_zone & melon_zone
    pts = np.argwhere(rind | (seed & melon_zone))[:, ::-1][::5]
    hull_img = Image.new('L', (w, h), 0)
    ImageDraw.Draw(hull_img).polygon([tuple(map(int, q)) for q in convex_hull(pts)], fill=255)
    hull_mask = np.asarray(hull_img.filter(ImageFilter.MaxFilter(41))) > 0
    layers['flesh'] = layers['script'] & hull_mask
    layers['script'] = layers['script'] & ~hull_mask
    layers['seeds'] = seed & hull_mask

    anym = layers['script'] | layers['detail']
    ys, xs = np.where(anym)
    pad = 6 * SCALE
    y0, y1 = max(0, ys.min() - pad), ys.max() + pad
    x0, x1 = max(0, xs.min() - pad), xs.max() + pad
    vw, vh = round((x1 - x0) / SCALE), round((y1 - y0) / SCALE)

    def to_path(mask, turdsize):
        # potracer traça os pixels "vazios": inverte para traçar o desenho
        plist = potrace.Bitmap(~mask[y0:y1, x0:x1]).trace(
            turdsize=turdsize, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
            alphamax=1.1, opticurve=True, opttolerance=0.5)
        parts = []
        for curve in plist:
            sp = curve.start_point
            d = [f'M{sp.x / SCALE:.2f} {sp.y / SCALE:.2f}']
            for seg in curve.segments:
                e = seg.end_point
                if seg.is_corner:
                    d.append(f'L{seg.c.x / SCALE:.2f} {seg.c.y / SCALE:.2f}L{e.x / SCALE:.2f} {e.y / SCALE:.2f}')
                else:
                    d.append(f'C{seg.c1.x / SCALE:.2f} {seg.c1.y / SCALE:.2f} '
                             f'{seg.c2.x / SCALE:.2f} {seg.c2.y / SCALE:.2f} {e.x / SCALE:.2f} {e.y / SCALE:.2f}')
            parts.append(''.join(d) + 'Z')
        return ''.join(parts)

    OUT.mkdir(parents=True, exist_ok=True)
    for name, mask in layers.items():
        d = to_path(mask, turdsize=6 if name == 'seeds' else 40)
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}">'
               f'<path fill="#000" fill-rule="evenodd" d="{d}"/></svg>')
        (OUT / f'{name}.svg').write_text(svg)
        print(f'{name}.svg', os.path.getsize(OUT / f'{name}.svg'), 'bytes')
    print(f'viewBox 0 0 {vw} {vh} — ajuste aspect-ratio em Logo.module.css se mudar')


if __name__ == '__main__':
    main()
