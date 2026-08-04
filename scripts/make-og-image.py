#!/usr/bin/env python3
"""
Genereert public/og-image.jpg: de voorbeeldafbeelding die WhatsApp, LinkedIn,
Facebook en X tonen als iemand een link naar de site deelt.

WAAROM DIT SCRIPT BESTAAT
De oude og-image.jpg was een stockfoto van een airco van Senville, een merk dat
Best Aircotechniek niet verkoopt en waarvan het logo zichtbaar op de unit stond.

ONTWERPKEUZES
- Gecentreerde opbouw. WhatsApp toont de afbeelding meestal in volle breedte,
  maar snijdt in sommige versies naar het midden. Een gecentreerde stapel blijft
  ook na zo'n uitsnede volledig leesbaar.
- De naam staat als platte tekst onder het logo. In het logo zelf loopt de naam
  rond in een cirkel, en dat is op miniatuurformaat onleesbaar.
- GEEN prijs in de afbeelding. Sociale netwerken cachen voorbeelden lang, dus
  een prijs in het beeld blijft rondgaan nadat hij is gewijzigd. De prijs staat
  in de og:description, die bij elke deling opnieuw wordt gelezen.

Draaien: python3 scripts/make-og-image.py
Vereist: pillow. Fonts: Montserrat uit /Library/Fonts (stand-in voor Plus
Jakarta Sans, zoals ook in de brochuregenerator).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / 'public' / 'logo.png'
OUT = ROOT / 'public' / 'og-image.jpg'

W, H = 1200, 630
NAVY_DARK = (15, 45, 71)      # #0f2d47
NAVY = (21, 61, 95)           # #153d5f
GOLD = (212, 175, 55)         # #d4af37
WHITE = (255, 255, 255)
LIGHT = (217, 232, 245)       # #d9e8f5

FONTS = Path('/Library/Fonts')


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / name
    if path.exists():
        return ImageFont.truetype(str(path), size)
    # Helvetica is de afgesproken terugvaloptie als Montserrat ontbreekt.
    return ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', size)


def centered(draw: ImageDraw.ImageDraw, y: int, text: str, f, fill) -> int:
    """Tekent gecentreerd op de breedte en geeft de onderkant terug."""
    box = draw.textbbox((0, 0), text, font=f)
    draw.text(((W - (box[2] - box[0])) / 2 - box[0], y), text, font=f, fill=fill)
    return y + (box[3] - box[1])


def build() -> None:
    img = Image.new('RGB', (W, H), NAVY_DARK)
    draw = ImageDraw.Draw(img)

    # Verticaal verloop van navy naar donkerder navy, subtiel.
    for y in range(H):
        t = y / H
        draw.line([(0, y), (W, y)], fill=(
            round(NAVY[0] + (NAVY_DARK[0] - NAVY[0]) * t),
            round(NAVY[1] + (NAVY_DARK[1] - NAVY[1]) * t),
            round(NAVY[2] + (NAVY_DARK[2] - NAVY[2]) * t),
        ))

    # Gouden kaderlijn, ingesprongen.
    draw.rectangle([26, 26, W - 27, H - 27], outline=GOLD, width=2)

    # Logo gecentreerd bovenaan.
    logo = Image.open(LOGO).convert('RGBA')
    size = 250
    logo.thumbnail((size, size), Image.LANCZOS)
    img.paste(logo, ((W - logo.width) // 2, 62), logo)

    y = 62 + logo.height + 34
    y = centered(draw, y, 'Best Aircotechniek', font('Montserrat-ExtraBold.ttf', 62), WHITE)

    # Gouden streepje als scheiding. Ruim onder de naam, anders leest het als
    # een onderstreping in plaats van als scheidingslijn.
    y += 44
    draw.line([(W / 2 - 95, y), (W / 2 + 95, y)], fill=GOLD, width=2)

    y += 30
    y = centered(draw, y, 'Altijd het beste klimaat', font('Montserrat-SemiBold.ttf', 34), GOLD)
    y += 26
    centered(draw, y, 'Airco laten installeren in heel Noord-Brabant',
             font('Montserrat-Medium.ttf', 27), LIGHT)

    # Kwaliteit 88: ruim onder de 300 kB die WhatsApp als grens aanhoudt.
    img.save(OUT, 'JPEG', quality=88, optimize=True, progressive=True)
    kb = OUT.stat().st_size / 1024
    print(f'{OUT.relative_to(ROOT)} weggeschreven: {W}x{H}, {kb:.0f} kB')
    if kb > 300:
        raise SystemExit('Te groot: WhatsApp toont afbeeldingen boven ~300 kB vaak niet.')


if __name__ == '__main__':
    build()
