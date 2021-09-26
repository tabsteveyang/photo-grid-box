const PhotoBlock = ({
  imgSrc = '',
  blockWidth = null,
  blockHeight = null,
  top = null,
  left = null,
  cursor = '',
  onClick = null,
  children = null
}) => {
  const style = {
    width: blockWidth ? `${blockWidth}px` : '',
    height: blockHeight ? `${blockHeight}px` : '',
    top: top ? `${top}px` : '',
    left: left ? `${left}px` : '',
    backgroundImage: imgSrc ? `url(${imgSrc})` : '',
    cursor
  }
  return (
    <div className='photo-block' style={style} onClick={onClick}>
      <div className="photo-block__panel">
        { children }
      </div>
    </div>
  )
}

PhotoBlock.propTypes = {
  imgConfig: PropTypes.object,
  imgSrc: PropTypes.string,
  blockWidth: PropTypes.number,
  blockHeight: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  onClick: PropTypes.func
}

export default PhotoBlock