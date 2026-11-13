/* ------------------------------------------------------------------
   EDIT HERE. This is the main file you change.
   ------------------------------------------------------------------ */

/* Your contact email. Every "enquire" and "register interest" link uses it. */
const EMAIL = "studio@yourdomain.com";

/* Optional: a free Formspree form ID (formspree.io) for the newsletter.
   Leave empty and the Subscribe button opens an email to you instead. */
const FORM_ID = "";

/* One block per original artwork. Put images in assets/images/originals/.
   file     the main image
   details  optional close-up images shown beside it and in the viewer
   cat      category; filter buttons appear once you use more than one
   status   for example "Available", "Enquire", "Reserved", "Sold", "Private collection" */
const ORIGINALS = [
  {
    file: "original-01.jpg",
    details: ["original-01-detail-1.jpg", "original-01-detail-2.jpg", "original-01-detail-3.jpg"],
    title: "Untitled",
    alt: "A smiling face with both hands covering the eyes, strands of hair across the fingertips",
    cat: "Portraits",
    medium: "Black pigment ink on 300 gsm paper",
    size: "17 × 20 cm",
    year: "2026",
    status: "Enquire",
    note: "A portrait built from single points of ink with a 0.05 mm pen, with fine line reserved for the hair."
  }
];
