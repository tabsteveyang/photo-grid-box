import React from 'react';

class ModalImage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='slideShowWrapper__imgWrapper' key={this.props.index}>
                <img id={'imgElm'+this.props.index} src={this.props.imgSrc}/>
            </div>
        );
    }
}

export default ModalImage;
