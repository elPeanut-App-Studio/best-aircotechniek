/**
 * Engelse klantreis, dezelfde zes stappen als de Nederlandse versie in
 * src/data/site.ts. Houd de volgorde gelijk, want JourneyInteractive koppelt
 * de iconen op index.
 */
export const journeyEn = [
  {
    title: 'You get in touch',
    description:
      'By phone, WhatsApp or the contact form you tell us about your home or office and what you need. We respond quickly and think along with you, in English.',
  },
  {
    title: 'Advice at your home',
    description:
      'We visit to look at your space. That lets us determine the right capacity, the type of system and the best position for the indoor and outdoor unit.',
  },
  {
    title: 'A quote made for you',
    description:
      'You receive a clear quote with no surprises. Any questions? We explain everything calmly. You decide in your own time.',
  },
  {
    title: 'Scheduling the installation',
    description:
      'Happy with the quote? Then we schedule the installation at a time that suits you. Clear agreements, no hassle.',
  },
  {
    title: 'Expert installation',
    description:
      'Our installers mount your system safely and to code, neatly finished. We leave your home or premises clean.',
  },
  {
    title: 'Handover and enjoy',
    description:
      'We test the system, explain the controls and stay available for questions. After that you simply enjoy the best climate.',
  },
] as const;

export const journeyIntroEn = {
  title: 'From first contact to cool comfort',
  description:
    'Having air conditioning installed does not have to be complicated. In six clear steps we guide you personally, transparently and expertly.',
} as const;
