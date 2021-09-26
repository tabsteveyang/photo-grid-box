
const PhotoGridBox = ({ imgs = [], imgOnClick = null, panelHTMLSetter = null, rowGap = 3, colGap = 3, ShowUnCompleteRow = false }) => {
  return (
    <div className="photo-grid-box">
      {

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
