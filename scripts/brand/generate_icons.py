"""Gera favicon, icon.png e apple-icon.png a partir do monograma com fundo transparente (docs/brand)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'docs' / 'brand' / 'logo-monograma-transparente.png'
APP = ROOT / 'src' / 'app'
# O iOS pinta de preto a transparência do ícone da tela inicial, então o apple-icon leva o fundo do site
APPLE_BG = (255, 255, 255, 255)  # --color-bg


def main():
    mark = Image.open(SOURCE).convert('RGBA')
    mark = mark.crop(mark.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox())

    def icon(size, inner, bg=(0, 0, 0, 0)):
        canvas = Image.new('RGBA', (size, size), bg)
        m = mark.copy()
        m.thumbnail((int(size * inner), int(size * inner)), Image.LANCZOS)
        canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
        return canvas

    icon(180, 0.78, APPLE_BG).convert('RGB').save(APP / 'apple-icon.png', optimize=True)
    # Paleta de 256 cores com alfa: o PNG de 512px cai de ~150KB para poucas dezenas de KB sem perda visível
    icon(512, 0.9).quantize(256, method=Image.Quantize.FASTOCTREE).save(APP / 'icon.png', optimize=True)
    # Na aba do navegador o ícone é minúsculo: o desenho ocupa quase todo o quadrado
    icon(256, 0.96).save(APP / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print('ícones gerados em src/app')


if __name__ == '__main__':
    main()
