#!/usr/bin/env python3
"""
Genereert de favicon-set en een web-formaat versie van het logo.

WAAROM DIT SCRIPT BESTAAT
De favicon verwees naar /logo.png: 2048x2048 en 5 MB. Elke bezoeker downloadde
dus 5 MB voor een icoontje van 32 pixels. Datzelfde bestand diende ook als
logo in de schema-markup, waar 512 pixels ruim volstaat.

WAAROM HET BINNENWERK VAN HET LOGO WORDT UITGESNEDEN
Het echte logo is een ronde badge met de bedrijfsnaam in een cirkel eromheen.
Die tekst is op 16 of 32 pixels onleesbaar en wordt een blur, ongeacht het
bestandsformaat. Daarom snijden we het binnenwerk eruit: de gouden zon met
stralen, de blauwe berg en de sneeuwvlok. Dat is het echte beeldmerk, geen
natekening, en het leest vanaf 32 pixels goed.

De uitsnede is 52% van de diameter. Ruimer meenemen (getest op 62%) snijdt door
de ronde tekst en ziet er afgebroken uit.

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

SOURCE_CROP = 0.52   # deel van de diameter dat het binnenwerk beslaat


def emblem(size=None, background=None):
    """Het binnenwerk van het echte logo, uitgesneden en op maat gebracht."""
    src = Image.open(SOURCE_LOGO).convert('RGBA')
    w, h = src.size
    side = int(min(w, h) * SOURCE_CROP)
    crop = src.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    if size and size != crop.width:
        crop = crop.resize((size, size), Image.LANCZOS)
    if background:
        flat = Image.new('RGBA', crop.size, background)
        flat.paste(crop, (0, 0), crop)
        return flat
    return crop


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

    # iOS-beginscherm: hier past het VOLLEDIGE ronde logo, want op 180 px is de
    # naam in de ring nog leesbaar. De uitsnede van het binnenwerk zou hier juist
    # lelijk zijn: die is vierkant, dus de ronde badge wordt afgesneden en er
    # blijven gouden stukjes en doorschijnende hoeken over.
    # Dekkende achtergrond, want Apple rondt zelf de hoeken af en maakt een
    # doorzichtige achtergrond zwart.
    canvas = 1024
    apple = Image.new('RGB', (canvas, canvas), NAVY)
    full_badge = Image.open(SOURCE_LOGO).convert('RGBA')
    full_badge.thumbnail((round(canvas * 0.94), round(canvas * 0.94)), Image.LANCZOS)
    apple.paste(full_badge, ((canvas - full_badge.width) // 2, (canvas - full_badge.height) // 2), full_badge)
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
