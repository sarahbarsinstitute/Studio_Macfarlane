/* ------------------------------------------------------------------
   EDIT HERE. This is the main file you change.
   ------------------------------------------------------------------ */

/* Your contact email, for example "studio@sarahlauren.com".
   While it is empty, the site shows a "Setup needed" notice and
   enquiry links and the enquiry form are switched off. */
const EMAIL = "";

/* The hero colour, used for buttons, links, the SL seal and the red dot
   beside sold works. Choose one name from COLOURS. To preview another
   without changing this, add ?colour=indigo to the end of the website address. */
const HERO_COLOUR = "vermilion";
const COLOURS = {
  vermilion: ["#C23B22", "#A3311C"],
  indigo:    ["#2B4A6F", "#1F3756"],
  verdigris: ["#3F7468", "#2F5A50"],
  plum:      ["#6E3557", "#552842"],
  sumi:      ["#1F1E1C", "#000000"]
};

/* The current exhibition shown at the top of the page. */
const EXHIBITION = {
  title: "The Hidden Face",
  subtitle: "Original drawings in archival ink",
  when: "Online exhibition · 2026",
  hero: "06"                      /* catalogue number of the work shown first */
};

/* One block per original drawing, in the order they hang.
   Images go in assets/images/originals/.
   no       catalogue number, for example "06"
   file     the main image; hero (optional) is a tighter crop used at the top of the page
   details  optional close-ups, shown in the artwork viewer
   show     false keeps a work in this list but off the website
   size     "width × height cm" of the drawing itself. When it is filled in, the viewer
            offers "See it on a wall", drawn to scale. Works without a size are hung
            on the installation wall at a nominal 20 cm height.
   status   "Available", "Reserved", "Sold" or "Private collection".
            Reserved and Sold show the hero-colour dot, as in a gallery.
   price    for example "NZ$850". Leave empty to show "Price on request".
   Titles in brackets are working titles: change them to your own. */
const ORIGINALS = [
  {
    no: "06",
    file: "original-06.jpg", hero: "original-06-tight.jpg",
    title: "Untitled (Hands)",
    alt: "Two raised forearms, the hands meeting at the fingertips",
    cat: "Portraits",
    medium: "Archival ink on cotton paper",
    size: "", year: "2026", status: "Available", price: "", note: ""
  },
  {
    no: "01",
    file: "original-01.jpg",
    details: ["original-01-detail-1.jpg", "original-01-detail-2.jpg", "original-01-detail-3.jpg"],
    title: "Untitled (Hidden Face)",
    alt: "A smiling face with both hands covering the eyes, strands of hair across the fingertips",
    cat: "Portraits",
    medium: "Archival ink on 300 gsm cotton paper",
    size: "17 × 20 cm", year: "2026", status: "Available", price: "",
    note: "A portrait built from single points of ink, with fine line kept for the hair. Two and a half days at the drawing table."
  },
  {
    no: "07",
    file: "original-07.jpg",
    title: "Rose",
    alt: "A single rose on its stem, with dark serrated leaves and a closed bud",
    cat: "Botanicals",
    medium: "Archival ink on cotton paper",
    size: "", year: "2026", status: "Available", price: "", note: ""
  },
  {
    no: "02",
    file: "original-02.jpg",
    title: "Untitled (Chignon)",
    alt: "Profile of a woman with eyes closed, her hair drawn in fine line and gathered in a low chignon",
    cat: "Portraits",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Available", price: "", note: ""
  },
  {
    no: "05",
    file: "original-05.jpg",
    title: "Untitled (From Below)",
    alt: "Close crop of a woman's face seen from below, cut to a sharp rectangle on the left",
    cat: "Portraits",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Available", price: "", note: ""
  },
  {
    no: "03",
    file: "original-03.jpg",
    title: "Untitled (Over the Shoulder)",
    alt: "A woman with swept-back hair resting her chin on her raised shoulder, looking to one side",
    cat: "Portraits",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Available", price: "", note: ""
  },
  {
    no: "04",
    file: "original-04.jpg",
    show: false,
    title: "Untitled (Hand Cream)",
    alt: "A crumpled, twisted aluminium tube of hand cream standing on its cap",
    cat: "Still life",
    medium: "Archival ink on paper",
    size: "", year: "", status: "Available", price: "",
    note: "Independent study. Not a commission or brand collaboration."
  }
];
