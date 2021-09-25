import GalleryGrid from '@build/index'

const files = [
  {
    url: "https://c1.staticflickr.com/1/699/22812601591_12ca1ee7cf_n.jpg",
    vertical: false,
  },
  {
    url: "https://c1.staticflickr.com/1/573/22409354059_ba46782c8f_n.jpg",
    vertical: false,
  },
  {
    url: "https://c1.staticflickr.com/6/5704/22410267477_303a090dcd_m.jpg",
    vertical: true,
  },
  {
    url: "https://c1.staticflickr.com/1/683/22207558073_8ecdb7abc4_n.jpg",
    vertical: false,
  }
];


ReactDom.render( 
  <GalleryGrid
    files={files}
    flickrHosted={true}
  /> , document.getElementById('app')
);