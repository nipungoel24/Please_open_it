/* ─────────────────────────────────────────────────────────────
   ✏️  EDIT EVERYTHING PERSONAL HERE
   ───────────────────────────────────────────────────────────── */

export const CONFIG = {
  // Her name (shows on the intro, nav, hero, envelope and letter)
  name: "Aashi",

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
    { src: "photos/01.jpg", caption: "where it all began ♡", wide: true },
    { src: "photos/02.jpg", caption: "my favourite person" },
    { src: "photos/03.jpg", caption: "us, under the neon lights", wide: true },
    { src: "photos/04.jpg", caption: "matching bunny ears, obviously" },
    { src: "photos/05.jpg", caption: "stopping to smell the flowers" },
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
    { src: "photos/18.jpg", caption: "softest glow" },
    { src: "photos/19.jpg", caption: "little adventures with you" },
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
    { title: "your chaos", note: "The cutest kind of mess. Never change." },
    { title: "your voice", note: "My favourite sound at the end of a long day." },
    { title: "just you", note: "All of it, every version, every single day." },
  ],

  /* The handwritten letter.
     {name} and {from} are filled in automatically.
     A blank line starts a new paragraph. */
  letter: `My dearest {name},

Happy birthday, my love. ♡

I wanted to make you something you could open again and again, so here it is: a tiny corner of the internet that belongs only to you.

Thank you for every laugh, every late night call, and every time you held my hand like it was the most natural thing in the world. You make my days softer and my life so much brighter.

I hope this year is gentle with you. I hope it brings you slow mornings, happy surprises, and every single thing you have been quietly wishing for.

And whatever it brings, I will be right there next to you.

Happy birthday, my favourite person.

Forever yours,
{from}`,
};
