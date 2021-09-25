import React from 'react';

class GalleryImg extends React.Component{
    constructor(props){
        super(props);
    }
    imgStyle = {
        backgroundImage: 'url(' + this.props.data.url + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        display: 'inline-block',
        margin: '0 0.12rem',
        cursor: 'pointer',
    };
    boxStyle = {
        minHeight: '210px',
        width: this.props.data.vertical ? '159px' : '350px',
    };
    imgOnClick = () => {
        this.props.showImg(this.props.index);
    };
    render(){
        return(
	    <div className='imgWrapper' style={this.imgStyle} onClick={this.imgOnClick}>
	        <div className='imgBox' style={this.boxStyle}></div>
	    </div>
        )
    }
}

export default GalleryImg;
