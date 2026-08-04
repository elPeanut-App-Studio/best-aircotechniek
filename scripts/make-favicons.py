#!/usr/bin/env python3
"""
Genereert de favicon-set en een web-formaat versie van het logo.

WAAROM DIT SCRIPT BESTAAT
De favicon verwees naar /logo.png: 2048x2048 en 5 MB. Elke bezoeker downloadde
dus 5 MB voor een icoontje van 32 pixels. Datzelfde bestand diende ook als
logo in de schema-markup, waar 512 pixels ruim volstaat.

WAAROM DE VORMEN HIER OPNIEUW GETEKEND WORDEN
Het echte logo is een ronde badge met de bedrijfsnaam in een cirkel eromheen.
Die tekst is op 16 of 32 pixels onleesbaar en wordt een grijze vlek. De favicon
gebruikt daarom het beeldmerk zonder tekst: navy ring, wit veld, gouden zon,
navy berg met witte top. Dat is dezelfde vereenvoudiging als public/favicon.svg,
die al in de repo stond maar nergens werd aangeroepen.

Tekenen gebeurt op 1024x1024 en wordt daarna verkleind, zodat de randen mooi
worden uitgevloeid. Rechtstreeks op 32x32 tekenen geeft trapjes.

Draaien: python3 scripts/make-favicons.py
Vereist: pillow.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
SOURCE_LOGO = ROOT / 'src' / 'assets' / 'logo.png'

NAVY = (27, 78, 121)      # #1b4e79
GOLD = (212, 175, 55)     # #d4af37
WHITE = (255, 255, 255)

S = 1024          # werkresolutie
U = S / 32        # de favicon.svg gebruikt een viewBox van 32 eenheden


def emblem(size: int = S, background: tuple | None = None) -> Image.Image:
    """Het beeldmerk zonder tekst, in dezelfde verhoudingen als favicon.svg."""
    img = Image.new('RGBA', (size, size), background or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    u = size / 32

    def box(cx, cy, r):
        return [(cx - r) * u, (cy - r) * u, (cx + r) * u, (cy + r) * u]

    d.ellipse(box(16, 16, 16), fill=NAVY)
    d.ellipse(box(16, 16, 13), fill=WHITE)
    d.ellipse(box(16, 12, 5), fill=GOLD)
    d.polygon([(8 * u, 20 * u), (16 * u, 14 * u), (24 * u, 20 * u), (24 * u, 24 * u), (8 * u, 24 * u)], fill=NAVY)
    d.line([(14 * u, 18 * u), (16 * u, 16 * u), (18 * u, 18 * u)], fill=WHITE, width=max(1, round(1.2 * u)), joint='curve')
    return img


def write(img: Image.Image, name: str, size: int, mode: str = 'RGBA') -> None:
    out = img.resize((size, size), Image.LANCZOS).convert(mode)
    path = PUBLIC / name
    out.save(path, optimize=True)
    print(f'  {name:24s} {size}x{size}  {path.stat().st_size / 1024:.1f} kB')


def build() -> None:
    base = emblem()

    # Browsertabblad. Eén 32x32 volstaat voor moderne browsers.
    write(base, 'favicon-32.png', 32)

    # Legacy en crawlers vragen /favicon.ico op, ook zonder link-tag.
    ico = PUBLIC / 'favicon.ico'
    base.resize((48, 48), Image.LANCZOS).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])
    print(f'  {"favicon.ico":24s} 16+32+48   {ico.stat().st_size / 1024:.1f} kB')

    # iOS-beginscherm: dekkende achtergrond, want Apple rondt zelf de hoeken af
    # en een doorzichtige achtergrond wordt dan zwart.
    apple = Image.new('RGB', (S, S), NAVY)
    inner = emblem(round(S * 0.82))
    apple.paste(inner, ((S - inner.width) // 2, (S - inner.height) // 2), inner)
    write(apple, 'apple-touch-icon.png', 180, mode='RGB')

    # Logo voor de schema-markup: het volledige logo mét tekst, maar op een
    # formaat dat bij een webpagina hoort. Google vraagt minimaal 112 pixels.
    full = Image.open(SOURCE_LOGO).convert('RGBA')
    full.thumbnail((512, 512), Image.LANCZOS)
    flat = Image.new('RGB', full.size, WHITE)
    flat.paste(full, (0, 0), full)
    logo_out = PUBLIC / 'logo.png'
    flat.save(logo_out, optimize=True)
    print(f'  {"logo.png":24s} {full.width}x{full.height}  {logo_out.stat().st_size / 1024:.1f} kB')


if __name__ == '__main__':
    build()
