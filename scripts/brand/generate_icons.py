"""Gera favicon, icon.png e apple-icon.png a partir do monograma da logo (docs/brand)."""
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'docs' / 'brand' / 'logo-monograma-original.jpg'
APP = ROOT / 'src' / 'app'
BG = (246, 243, 238, 255)  # --color-bg (porcelana)
GAIN, THRESH = 4.5, 16  # distância do branco → opacidade; tolerância ao ruído do JPEG


def cutout(path, scale=2):
    im = Image.open(path).convert('RGB')
    im = im.resize((im.width * scale, im.height * scale), Image.LANCZOS)
    src, out = im.load(), Image.new('RGBA', im.size)
    dst = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = src[x, y]
            a = max(0, min(255, int((255 - min(r, g, b) - THRESH) * GAIN)))
            if a == 0:
                dst[x, y] = (0, 0, 0, 0)
                continue
            f = a / 255
            # desfaz a mistura com o branco para não sobrar halo claro
            dst[x, y] = tuple(int(max(0, min(255, (c - (1 - f) * 255) / f))) for c in (r, g, b)) + (a,)
    alpha = out.getchannel('A').filter(ImageFilter.GaussianBlur(0.6))
    out.putalpha(alpha)
    return out.crop(alpha.point(lambda v: 255 if v > 20 else 0).getbbox())


def main():
    full = cutout(SOURCE)
    mark = full.crop((0, 0, full.width, int(full.height * 0.7)))  # só "LG" + melancia
    mark = mark.crop(mark.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox())

    def icon(size, inner=0.78):
        canvas = Image.new('RGBA', (size, size), BG)
        m = mark.copy()
        m.thumbnail((int(size * inner), int(size * inner)), Image.LANCZOS)
        canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
        return canvas

    icon(180).convert('RGB').save(APP / 'apple-icon.png', optimize=True)
    icon(512).save(APP / 'icon.png', optimize=True)
    icon(256, inner=0.9).save(APP / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print('ícones gerados em src/app')


if __name__ == '__main__':
    main()
