/* ------------------------------------------------------------------
   EDIT HERE. This is the main file you change.
   ------------------------------------------------------------------ */

/* Your contact email, for example "studio@sarahlauren.com".
   Every enquiry link and the enquiry form use it. While it is empty the site
   shows a "Setup needed" notice and enquiry links are switched off. */
const EMAIL = "";

/* One block per original artwork. Put images in assets/images/originals/.
   file     the main image
   details  optional close-ups (up to three are laid out beside a featured work)
   feature  true presents the work large with its details; others follow in the sequence below
   cat      category; filter buttons appear once you use more than one
   size, year, note  optional; left out of the page when empty
   status   for example "Available", "Enquire", "Reserved", "Sold", "Private collection" */
const ORIGINALS = [
  {
    file: "original-01.jpg",
    details: ["original-01-detail-1.jpg", "original-01-detail-2.jpg", "original-01-detail-3.jpg"],
    feature: true,
    title: "Untitled",
    alt: "A smiling face with both hands covering the eyes, strands of hair across the fingertips",
    cat: "Portraits",
    medium: "Black pigment ink on 300 gsm paper",
    size: "17 × 20 cm",
    year: "2026",
    status: "Enquire",
    note: "A portrait built from single points of ink with a 0.05 mm pen, with fine line reserved for the hair."
  },
  {
    file: "original-02.jpg",
    title: "Untitled",
    alt: "Profile of a woman with eyes closed, her hair drawn in fine line and gathered in a low chignon",
    cat: "Portraits",
    medium: "Black pigment ink on paper",
    size: "", year: "", status: "Enquire", note: ""
  },
  {
    file: "original-03.jpg",
    title: "Untitled",
    alt: "A woman with swept-back hair resting her chin on her raised shoulder, looking to one side",
    cat: "Portraits",
    medium: "Black pigment ink on paper",
    size: "", year: "", status: "Enquire", note: ""
  },
  {
    file: "original-04.jpg",
    title: "Untitled",
    alt: "A crumpled, twisted aluminium tube of hand cream standing on its cap",
    cat: "Still life",
    medium: "Black pigment ink on paper",
    size: "", year: "", status: "Enquire",
    note: "Independent study. Not a commission or brand collaboration."
  },
  {
    file: "original-05.jpg",
    title: "Untitled",
    alt: "Close crop of a woman's face seen from below, cut to a sharp rectangle on the left",
    cat: "Portraits",
    medium: "Black pigment ink on paper",
    size: "", year: "", status: "Enquire", note: ""
  }
];
