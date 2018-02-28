# photo-grid-box
A ReactJS flickr-like photo array showcase module.<br/>

## Install
```shell
$ npm install photo-grid-box
$ cd [the root path of your react project]
$ cp node_modules/photo-grid-box/build/styles.css public/photogridbox.css
```
```html
<!Doctype html>
<html>
<head>
    <!--link to photo-grid-box module css file (need to be copied manually)-->
    <link rel="stylesheet" type="text/css" href="/photogridbox.css" />
...
```
<h6>Steps:</h6>
1. Install the module through npm<br/>
2. After install the module, please move the build/styles.css file to the public folder of your ReactJS project, and add a css file reference in the react project's public/index.html file. You can see more details in the code example (https://github.com/tabsteveyang/photo-grid-box-demo)

## Usage
```js
import React from 'react';
import GalleryGrid from 'photo-grid-box'; //import the module.

//Create an array with several object elements, each element has to have an url and vertical attribute.
//These two attributes are essential:
//1. url: the url attribute store the link of the picture.
//    --the example uses Flickr as the image file hosting service.
//    --please use the img src at the Flickr album page to get the greatest result. 
//2. vertical: the vertical attribute store the info of the image, tell the module that the image is vertical or not.
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

//Render the module in JSX.
//It takes two attributes, these attributes are essential:
//1. files: reference to the array that we just created.
//2. filckrHosted: if using Flickr as the image file hosting service, this attribute has to be true.
//    --this module has only been tested in the case that image files are hosted on Flickr.
const jsx = (
    <div>
        <GalleryGrid
            files={files}
            flickrHosted={true}
        />
    </div>
);

ReactDOM.render(jsx, document.getElementById('app-root'));
```

## Demo
Here is the demostration page (https://photo-grid-box-demo.herokuapp.com/)<br/>

## Notice
This module has only been tested in the case that image files are hosted on Flickr. Using another way to link to the image files could meet some problems.

## Links
1. https://photo-grid-box-demo.herokuapp.com/<br/>
2. https://github.com/tabsteveyang/photo-grid-box-demo<br/>
3. https://www.npmjs.com/package/photo-grid-box<br/>
