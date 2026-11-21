/* ------------------------------------------------------------------
   EDIT HERE. This is the main file you change.
   ------------------------------------------------------------------ */

/* Your contact email, for example "studio@sarahlauren.com".
   While it is empty, the site shows a "Setup needed" notice and
   enquiry links and the enquiry form are switched off. */
const EMAIL = "";

/* One block per original drawing, in the order they appear.
   Images go in assets/images/originals/.
   no       the catalogue number shown on the site, for example "06"
   file     the main image
   details  optional close-ups (up to three are laid out beside a featured work)
   feature  true shows the work large with its details; the rest follow in a sequence
   show     false keeps a work in this list but off the website
   cat      category; filter buttons appear once more than one is used
   size, year, note  optional; left out of the page when empty
   status   for example "Available", "Enquire", "Reserved", "Sold", "Private collection" */
const ORIGINALS = [
  {
    no: "01",
    file: "original-01.jpg",
    details: ["original-01-detail-1.jpg", "original-01-detail-2.jpg", "original-01-detail-3.jpg"],
    feature: true,
    title: "Untitled",
    alt: "A smiling face with both hands covering the eyes, strands of hair across the fingertips",
    cat: "Portraits",
    medium: "Archival ink on 300 gsm cotton paper",
    size: "17 × 20 cm",
    year: "2026",
    status: "Enquire",
    note: "A portrait built from single points of ink, with fine line kept for the hair."
  },
  {
    no: "06",
    file: "original-06.jpg",
    title: "Untitled",
    alt: "Two raised forearms, the hands meeting at the fingertips",
    cat: "Portraits",
    medium: "Archival ink on cotton paper",
    size: "", year: "2026", status: "Enquire", note: ""
  },
  {
    no: "07",
    file: "original-07.jpg",
    title: "Rose",
    alt: "A single rose on its stem, with dark serrated leaves and a closed bud",
    cat: "Botanicals",
    medium: "Archival ink on cotton paper",
    size: "", year: "2026", status: "Enquire", note: ""
  },
  {
    no: "02",
    file: "original-02.jpg",
    title: "Untitled",
    alt: "Profile of a woman with eyes closed, her hair drawn in fine line and gathered in a low chignon",
    cat: "Portraits",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Enquire", note: ""
  },
  {
    no: "05",
    file: "original-05.jpg",
    title: "Untitled",
    alt: "Close crop of a woman's face seen from below, cut to a sharp rectangle on the left",
    cat: "Portraits",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Enquire", note: ""
  },
  {
    no: "03",
    file: "original-03.jpg",
    title: "Untitled",
    alt: "A woman with swept-back hair resting her chin on her raised shoulder, looking to one side",
    cat: "Portraits",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Enquire", note: ""
  },
  {
    no: "04",
    file: "original-04.jpg",
    show: false,
    title: "Untitled",
    alt: "A crumpled, twisted aluminium tube of hand cream standing on its cap",
    cat: "Still life",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Enquire",
    note: "Independent study. Not a commission or brand collaboration."
  }
];
