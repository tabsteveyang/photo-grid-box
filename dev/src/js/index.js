import { useState } from 'react'
import PhotoGridBox from '@components/PhotoGridBox'

const DevView = () => {
  const [imgs, setImgs] = useState([
    {
      src: 'https://live.staticflickr.com/4513/37344511664_79f514815f_n.jpg',
      payload: {
        title: 'picture1'
      }
    },
    {
      src: 'https://live.staticflickr.com/4716/38433351710_0355b58068_z.jpg',
      payload: {
        title: 'picture2'
      }
    },
    'https://live.staticflickr.com/4703/25372643047_302849c0d0_z.jpg',
    'https://live.staticflickr.com/4753/38432660740_78d6d34d89_z.jpg',
    'https://live.staticflickr.com/4649/38432665780_71b232cc13_z.jpg',
    'https://live.staticflickr.com/4704/38432657930_c96c750753_z.jpg',
    'https://live.staticflickr.com/668/22838204747_bc4d056d61_z.jpg',
    'https://live.staticflickr.com/5648/22603412144_8bd9ba19bd_n.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/683/22207558073_8ecdb7abc4_z.jpg',  
    'https://live.staticflickr.com/5156/14353130514_02634d7a15.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/683/22207558073_8ecdb7abc4_z.jpg',
    'https://live.staticflickr.com/5648/22603412144_8bd9ba19bd_n.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/3769/12146825775_cb8ae5f7e4_z.jpg',
    'https://live.staticflickr.com/7098/13183170974_451bd93d65.jpg',
    'https://live.staticflickr.com/4709/25401230397_a8a375d8cd.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/4765/39533020694_3a8329e765.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/4754/38432659650_9d6e5876a1.jpg',
    'https://live.staticflickr.com/4753/38432660740_78d6d34d89.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/4654/39345481745_1be0a0098c.jpg',
    'https://live.staticflickr.com/4719/38432661400_f53017f598.jpg',
    'https://live.staticflickr.com/4665/38432665950_12d8d33002.jpg',
    'https://live.staticflickr.com/4677/40243327101_965347ed63.jpg',
    'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
    'https://live.staticflickr.com/4665/38432665950_12d8d33002.jpg'
  ])
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

  const onAppendButtonClick = () => {
    setImgs([
      ...imgs,
      'https://live.staticflickr.com/668/22838204747_bc4d056d61_z.jpg',
      'https://live.staticflickr.com/5648/22603412144_8bd9ba19bd_n.jpg',
      'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
      'https://live.staticflickr.com/683/22207558073_8ecdb7abc4_z.jpg',  
      'https://live.staticflickr.com/5156/14353130514_02634d7a15.jpg',
      'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
      'https://live.staticflickr.com/683/22207558073_8ecdb7abc4_z.jpg',
      'https://live.staticflickr.com/5648/22603412144_8bd9ba19bd_n.jpg',
      'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
      'https://live.staticflickr.com/3769/12146825775_cb8ae5f7e4_z.jpg',
      'https://live.staticflickr.com/7098/13183170974_451bd93d65.jpg',
      'https://live.staticflickr.com/4709/25401230397_a8a375d8cd.jpg',
      'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
      'https://live.staticflickr.com/4765/39533020694_3a8329e765.jpg',
      'https://live.staticflickr.com/5704/22410267477_303a090dcd_n.jpg',
      {
        src: 'https://live.staticflickr.com/4513/37344511664_79f514815f_n.jpg',
        payload: {
          title: 'picture1'
        }
      },
      {
        src: 'https://live.staticflickr.com/4716/38433351710_0355b58068_z.jpg',
        payload: {
          title: 'picture2'
        }
      }
    ])
  }
  const onChangeGapButtonClick = () => {
    setRowGap(10)
    setColGap(20)
  }
  const onShowUnCompleteRowButtonClick = () => {
    setShowUnCompleteRow(!showUnCompleteRow)
  }
  return(
    <>
      <PhotoGridBox
        imgs={imgs}
        colGap={colGap}
        rowGap={rowGap}
        imgOnClick={imgOnClick}
        panelHTMLSetter={panelHTMLSetter}
        showUnCompleteRow={showUnCompleteRow}
      />
      <button onClick={onAppendButtonClick}>append</button>
      <button onClick={onChangeGapButtonClick}>change gap</button>
      <button onClick={onShowUnCompleteRowButtonClick}>trigger show all rows</button>
    </>
  )
}

ReactDom.render( 
  <DevView /> , document.getElementById('app')
);