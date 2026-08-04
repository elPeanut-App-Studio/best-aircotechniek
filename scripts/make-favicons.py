#!/usr/bin/env python3
"""
Genereert de favicon-set en een web-formaat versie van het logo.

WAAROM DIT SCRIPT BESTAAT
De favicon verwees naar /logo.png: 2048x2048 en 5 MB. Elke bezoeker downloadde
dus 5 MB voor een icoontje van 32 pixels. Datzelfde bestand diende ook als
logo in de schema-markup, waar 512 pixels ruim volstaat.

ALTIJD HET VOLLEDIGE LOGO
Op verzoek van Best Aircotechniek gebruiken alle iconen het volledige ronde
logo, ongewijzigd. Eerdere pogingen met een uitsnede van het binnenwerk en met
een vereenvoudigde natekening zijn afgewezen: dat zijn niet zijn logo.

De bedrijfsnaam loopt rond een cirkel en is op 16 of 32 pixels niet leesbaar.
Dat is een gevolg van het formaat en niet van dit script; het is een bewuste
keuze om het logo dan toch heel te laten.

Verkleinen gebeurt vanuit de bron van 2048 px met LANCZOS, zodat de randen mooi
worden uitgevloeid.

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

def emblem(size=None, background=None):
    """Het volledige logo, ongewijzigd, eventueel op een dekkende achtergrond."""
    img = Image.open(SOURCE_LOGO).convert('RGBA')
    if size and size != img.width:
        img = img.resize((size, size), Image.LANCZOS)
    if background:
        flat = Image.new('RGBA', img.size, background)
        flat.paste(img, (0, 0), img)
        return flat
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

    # iOS-beginscherm: dekkende navy achtergrond, want Apple rondt zelf de hoeken
    # af en maakt een doorzichtige achtergrond zwart.
    canvas = 1024
    apple = Image.new('RGB', (canvas, canvas), NAVY)
    badge = emblem(round(canvas * 0.94))
    apple.paste(badge, ((canvas - badge.width) // 2, (canvas - badge.height) // 2), badge)
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
