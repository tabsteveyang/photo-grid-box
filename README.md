# photo-grid-box
A Flickr-like photo array showcase module for ReactJS.<br/>

## Before Update
- If you are migrating from the old version, please notice the version 2 is very different from the previous versions.

## Install
```shell
$ npm install photo-grid-box
```

### HTML
#### There are three ways to get the CSS file:
  1. Copy or reference the file under /node_modules/photo-grid-box/build/
  2. Download them from the build folder in the GitHub repo
#### After getting the file, reference it in a HTML file
```html
<!Doctype html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="[pathToTheFilesFolder]/photo-grid-box.min.css" />
...
```
  3. import the css file from the module directly
```js
import 'photo-grid-box/photo-grid-box.min.css';
```
### Babel
```js
import 'photo-grid-box/photo-grid-box.min.css';
import PhotoGridBox from 'photo-grid-box';
```
### Browserify/Webpack
```js
const PhotoGridBox = require("photo-grid-box");
```
- The CSS file has to be referenced in HTML, no matter which way you decide to import the module.

## Usage
- Assuming that you are writing the code in a function component:
```js
const [imgs, setImgs] = useState([
  // use an object as an element allows you to to build some customized feature
  {
    src: "https://c1.staticflickr.com/1/699/22812601591_12ca1ee7cf_n.jpg",
    payload: {  // you can carry more information in the payload
      title: 'mountain'
    }
  },
  {
    src: "https://c1.staticflickr.com/1/573/22409354059_ba46782c8f_n.jpg",
    payload: {
      title: 'wall'
    }
  },
  {
    src: "https://c1.staticflickr.com/6/5704/22410267477_303a090dcd_m.jpg",
    payload: {
      title: 'jet'
    }
  },
  "https://c1.staticflickr.com/1/683/22207558073_8ecdb7abc4_n.jpg"  // a string that point out the image's path is also acceptable
]);

const [rowGap, setRowGap] = useState(3)
const [colGap, setColGap] = useState(3)
const [showUnCompleteRow, setShowUnCompleteRow] = useState(false)

const imgOnClick = (e, imgConfig) => {
  console.log('img clicked!', e, imgConfig)
}
const panelHTMLSetter = (imgConfig) => {
  let result = null
  if (imgConfig && imgConfig.payload && imgConfig.payload.title) {
    result = <div className="photo-block__panel__title">{imgConfig.payload.title}</div>
  }
  return result
}

// set the states to different values to update the view
return (
  <PhotoGridBox
    imgs={imgs} // set the pictures to show
    rowGap={rowGap} // set the height between each row (optional)
    colGap={colGap} // set the width between each block (optional)
    imgOnClick={imgOnClick} // the onClick event handler for each block (optional)
    panelHTMLSetter={panelHTMLSetter} // the function that returns a JSX for adding the children on the panel (optional)
    showUnCompleteRow={showUnCompleteRow} // In default, the PhotoGridBox will hide the last row if the last row is not complete; to make it looks more natural when loading pictures chunk by chunk. When there is no more picture to load, or for any reason, you can set the prop to true cancel the feature. (optional)
  />
)
);
```

## Links
1. https://www.npmjs.com/package/photo-grid-box
2. https://github.com/tabsteveyang/photo-grid-box