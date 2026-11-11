/* ─────────────────────────────────────────────────────────────
   ✏️  EDIT EVERYTHING PERSONAL HERE
   ───────────────────────────────────────────────────────────── */

export const CONFIG = {
  // Her name (shows on the intro, nav, hero, envelope and letter)
  name: "Aashi",

  // Her nicknames, used in different spots around the page
  names: {
    intro: "Aashi", // opening "open me" screen
    nav: "soona", // top-left "for ___"
    hero: "my bachaa", // "Today is all about ___"
    envelope: "my chocopie", // written on the envelope
  },

  // Your name (signature in the footer + letter)
  from: "Nipun",

  // Her birthday (day and month as numbers, year for the footer)
  day: 12,
  month: 11,
  year: 2026,

  /* Photos: drop image files into  public/photos/  and list them here.
     Any photo that is missing shows a cute placeholder instead,
     so the site never looks broken. "hero" is the big arch photo at the top. */
  heroPhoto: "photos/hero.jpg",
  // wide: true → landscape polaroid (so nobody gets cropped out)
  photos: [
    { src: "photos/01.jpg", caption: "the time you came to my college for my fest", wide: true },
    { src: "photos/02.jpg", caption: "my favourite person" },
    { src: "photos/03.jpg", caption: "just you & me ♡", wide: true },
    { src: "photos/04.jpg", caption: "matching bunny ears, obviously" },
    { src: "photos/05.jpg", caption: "live concert: rose mic edition 🎤" },
    { src: "photos/06.jpg", caption: "flowers for my flower" },
    { src: "photos/07.jpg", caption: "snack time is serious" },
    { src: "photos/08.jpg", caption: "that giggle gets me every time", wide: true },
    { src: "photos/09.jpg", caption: "pretty, as always", wide: true },
    { src: "photos/10.jpg", caption: "can't stop, won't stop" },
    { src: "photos/11.jpg", caption: "under the fairy lights", wide: true },
    { src: "photos/12.jpg", caption: "that face ♡" },
    { src: "photos/13.jpg", caption: "that smile though" },
    { src: "photos/14.jpg", caption: "very focused, very cute" },
    { src: "photos/15.jpg", caption: "my whole heart", wide: true },
    { src: "photos/16.jpg", caption: "main character energy" },
    { src: "photos/17.jpg", caption: "flowers + you = perfect" },
    { src: "photos/19.jpg", caption: "little adventures with you" },
    { src: "photos/20.jpg", caption: "flowers in her hair ♡" },
    { src: "photos/21.jpg", caption: "peace & love", wide: true },
    { src: "photos/22.jpg", caption: "us, being us" },
    { src: "photos/23.jpg", caption: "my cutest girl" },
  ],

  // Seven reasons, one per colour arch
  reasons: [
    { title: "your laugh", note: "The one that makes every room feel softer." },
    { title: "your heart", note: "Kind to everyone, always, even on hard days." },
    { title: "your eyes", note: "I lose every staring contest on purpose." },
    { title: "your hugs", note: "My favourite place in the whole world." },
    { title: "your smile", note: "The one thing I would keep forever, if I could keep just one." },
    { title: "your voice", note: "My favourite sound at the end of a long day." },
    { title: "just you", note: "All of it, every version, every single day." },
  ],

  /* The handwritten letter.
     {name} and {from} are filled in automatically.
     A blank line starts a new paragraph. */
  letter: `My dearest {name},

Happy birthday, my love. ♡

I wanted to make you something you could open again and again, so here it is: a tiny corner of the internet that belongs only to you.

From the very first day we were together, I've loved you, and I'll keep loving you for the rest of my life. Every laugh, every late night call, every little hangout holds a special place in my heart.

We haven't always had it easy. We've had our share of ups and downs, but even through all of that we are still here, stronger than before, still choosing each other. I'm so grateful for that, and for you.

Thank you for your love, your patience, and your presence in my life. I hope this year is gentle with you, and brings you slow mornings, happy surprises, and every single thing you've been quietly wishing for.

Here's to many more birthdays, countless fun, and a lifetime of love together.

Happy birthday, my soona, my chocopie, my bachaa, my favourite person.

Forever yours,
{from}`,
};
