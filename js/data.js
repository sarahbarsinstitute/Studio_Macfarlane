/* EDIT HERE: one block per original artwork. Put the image in assets/images/originals/ and match "file". */
const EMAIL="studio@yourdomain.com";
const ORIGINALS=[
{file:"original-01.jpg",cat:"Portraits",ratio:"3/4"},{file:"original-02.jpg",cat:"Botanical",ratio:"4/5"},
{file:"original-03.jpg",cat:"Portraits",ratio:"1/1"},{file:"original-04.jpg",cat:"Details",ratio:"4/3"},
{file:"original-05.jpg",cat:"Botanical",ratio:"2/3"},{file:"original-06.jpg",cat:"Portraits",ratio:"3/4"}
].map((o,i)=>({title:"Title to be added",medium:"Medium to be confirmed",size:"Dimensions to be confirmed",year:"Year to be confirmed",status:"Availability to be confirmed",note:"Optional description to be added.",...o,n:i+1}));
/* Illustrative placeholders only. Replace with real editions when confirmed. */
const EDITIONS=[{file:"edition-01.jpg",name:"Edition title (placeholder)"},{file:"edition-02.jpg",name:"Edition title (placeholder)"},{file:"edition-03.jpg",name:"Edition title (placeholder)"}];
