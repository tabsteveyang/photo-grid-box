import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import PhotoBlock from './PhotoBlock'

const PhotoGridBox = ({
  imgs = [],
  imgOnClick = null,
  panelHTMLSetter = null,
  rowGap = 3,
  colGap = 3,
  showUnCompleteRow = false
}) => {
  const boxDOMRef = useRef(null)
  const lastRenderedWindowOffsetWidth = useRef(null)
  const [renderTrigger, setRenderTrigger] = useState(null)
  const [boxStyle, setBoxStyle] = useState(null)
  const [jsx, setJsx] = useState(null)

  useEffect(() => {
    triggerRender()
  }, [imgs, imgOnClick, panelHTMLSetter, rowGap, colGap, showUnCompleteRow])
  useEffect(() => {
    let timeout
    const resizeEvent = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (lastRenderedWindowOffsetWidth.current !== window.innerWidth) {
          triggerRender()
          lastRenderedWindowOffsetWidth.current = window.innerWidth
        }      
      }, 300)
    }
    window.addEventListener('resize', resizeEvent)
    return () => window.removeEventListener('resize', resizeEvent)
  }, [])
  useEffect(() => {
    renderBlockByImgs()
  }, [renderTrigger])

  const triggerRender = () => {
    setRenderTrigger(+new Date())
  }
  const getRowHeight = () => {
    if (window.innerWidth <= 350) {
      return 200
    } else if (window.innerWidth <= 550) {
      return 250
    } else if (window.innerWidth <= 768) {
      return 270
    }
    return 280
  }
  const getMinImgWidth = () => {
    if (window.innerWidth <= 350) {
      return 130
    } else if (window.innerWidth <= 550) {
      return 150
    } else if (window.innerWidth <= 768) {
      return 180
    }
    return 200
  }
  const calcWidthByRowHeight = (imgWidth, imgHeight, rowHeight, minImgWidth) => {
    const ratio = rowHeight / imgHeight
    let result = Math.round(imgWidth * ratio)
    const buffer = 100
    if (result < minImgWidth + buffer) {
      result = minImgWidth
    }
    return result
  }

  const renderBlockByImgs = () => {
    const jsx = []
    const imgLoader = new Image()
    const rowHeight = getRowHeight()
    const minImgWidth = getMinImgWidth()
    const imgsLength = imgs.length
    const boxOffsetWidth = boxDOMRef.current.offsetWidth
    const newBoxStyle = { ...boxStyle }
    let rowLength = 0
    let imgIndex = 0
    let tempRow = []
    let tempAccumulateWidth = 0

    imgLoader.onload = function() {
      const img = this
      const imgWidth = calcWidthByRowHeight(img.width, img.height, rowHeight, minImgWidth)
      const imgAndGapWidth = imgWidth + colGap
      const element = createTempRowElement(imgIndex, imgs[imgIndex], img.src, imgWidth, rowHeight, rowLength, rowHeight)
      const buffer = minImgWidth
      addElementToTempRow(element, imgAndGapWidth)
      if (tempAccumulateWidth + buffer >= boxOffsetWidth) {
        adjustImagesInTheRow()
        handleCompleteRow()
      }
      loadImage(++imgIndex, imgsLength)
    }
    imgLoader.onerror = function (e) {
      loadImage(++imgIndex, imgsLength)
    }
    const loadImage = (imgIndex, imgsLength) => {
      if (imgIndex === imgsLength) {
        if (tempAccumulateWidth) {
          handleUnCompleteRow()
        }
        setStateToRender()
        return
      }
      var imgSrc = imgs[imgIndex]
      if (imgSrc && typeof imgSrc === 'object') {
        if (imgSrc.src) {
          imgSrc = imgSrc.src
        } else {
          console.error('Invalid format: elements in imgs should be a string or an object with src attribute. Picture in index: ' + imgIndex + ' will not be shown.')
        }
      }
      imgLoader.src = imgSrc
    }
    const createTempRowElement = (imgIndex, imgConfig, imgSrc, imgWidth, imgHeight, rowIndex) => {
      const gap = rowGap * rowIndex
      const top = rowHeight * rowIndex + gap
      const left = tempAccumulateWidth
      const element = {
        imgIndex,
        width: imgWidth,
        height: imgHeight,
        top,
        left,
        src: imgSrc,
        imgConfig
      }
      return element
    }
    const addElementToTempRow = (element, imgAndGapWidth) => {
      tempAccumulateWidth += imgAndGapWidth
      tempRow.push(element)
    }
    const adjustImagesInTheRow = () => {
      const pad = boxOffsetWidth - (tempAccumulateWidth - colGap)
      const adjustElementsIndex = []
      for (let i = 0; i < tempRow.length; i++) {
        if (pad > 0) {
          adjustElementsIndex.push(i)
        } else {
          const element = tempRow[i]
          const elementWidth = parseFloat(element.width)
          if (elementWidth > minImgWidth) {
            adjustElementsIndex.push(i)
          }
        }
      }
      const padPerBlock = pad / adjustElementsIndex.length
      let accumulateWidth = 0
      for (let i = 0; i < tempRow.length; i++) {
        const element = tempRow[i]
        const width = parseFloat(element.width)
        if (adjustElementsIndex.includes(i)) {
          width += padPerBlock
          element.width = width
        }
        element.left = accumulateWidth
        accumulateWidth += width + colGap
      }
    }
    const handleCompleteRow = () => {
      addRowToResult()
      resetTempForNextRow()
    }
    const handleUnCompleteRow = () => {
      if (showUnCompleteRow || rowLength === 0) {
        addRowToResult()  
      }
      resetTempForNextRow()
    }
    const addRowToResult = () => {
      rowLength += 1
      const accumulateBlockHeight = rowHeight * rowLength + rowGap * (rowLength - 1)
      newBoxStyle.height = parseFloat(accumulateBlockHeight) + 'px'
      tempRow.map((element) => {
        const { imgIndex, src, width, height, top, left, imgConfig } = element
        let onClick = null
        let children = null
        let cursorStyle = ''
        if (imgOnClick) {
          onClick = (e) => imgOnClick(e, imgConfig)
          cursorStyle = 'pointer'
        }
        if (panelHTMLSetter) children = panelHTMLSetter(imgConfig) || null
        jsx.push(<PhotoBlock
          key={imgIndex}
          imgSrc={src}
          blockWidth={width}
          blockHeight={height}
          top={top}
          left={left}
          cursor={cursorStyle}
          onClick={onClick}
        >
          {children}
        </PhotoBlock>)
      })
    }
    const resetTempForNextRow = () => {
      tempRow = []
      tempAccumulateWidth = 0
    }
    const setStateToRender = () => {
      setJsx(jsx)
      setBoxStyle(newBoxStyle)
    }

    loadImage(imgIndex, imgsLength)
  }

  return (
    <div className="photo-grid-box" style={boxStyle} ref={boxDOMRef}>
      {
        jsx && jsx.length > 0
          ? jsx
          : null
      }
    </div>
  )
}

PhotoGridBox.propTypes = {
  imgs: PropTypes.array,
  imgOnClick: PropTypes.func,
  panelHTMLSetter: PropTypes.func,
  rowGap: PropTypes.number,
  colGap: PropTypes.number,
  ShowUnCompleteRow: PropTypes.bool
}

export default PhotoGridBox
