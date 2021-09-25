import GalleryImg from './GalleryImg';
import GalleryModal from './GalleryModal';

class GalleryGrid extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        modal: {
            modalIsOpen: false,
            selectedIndex: 0,
        },
    };
//A. for flickr-like-grid:
    handleResize = () => {
        let targetElm = document.getElementById('photoBlockWrapper');
        let elmWidth = targetElm.offsetWidth;
        let elmLength = targetElm.children.length;
        let windowWidth = window.innerWidth;
        //variables for loop:
        let rowArray = [];
        let rowWidth = 0;
        let rowWidthReal = 0;
        let space = 0;
	for(let i=0; i<elmLength; i++){
            //A-1. reset element's width and height for the caculation:
            let oriWidth = this.props.files[i].vertical ? '159' : '350';
            let oriHeight = '210';
            targetElm.children[i].children[0].setAttribute('style', "width: " +oriWidth+ "px; height: " +oriHeight+ "px;");

            //A-2. start caculation:
            rowWidth += targetElm.children[i].offsetWidth;
            if(rowWidth >= elmWidth || rowWidth >= 1280){
                space = (elmWidth - rowWidthReal - 70) / rowArray.length;
                for(let j=0; j<rowArray.length;j++){
                    let rowIndex = rowArray[j];
                    let newWidth = targetElm.children[rowIndex].offsetWidth + space;
                    let newHeight = targetElm.children[rowIndex].offsetHeight + space;
                    let imgElm = targetElm.children[rowIndex].children[0];
                    imgElm.setAttribute('style', "width: " + newWidth + "px; height: " + newHeight + "px;");
                }
                
                //if the last element is the only element in the last row.
                if(i === elmLength - 1){
                    let newWidth = targetElm.children[i].children[0].offsetWidth + space;
                    let newHeight = targetElm.children[i].children[0].offsetHeight + space;
                    let imgElm = targetElm.children[i].children[0];
                    imgElm.setAttribute('style', "width: " + newWidth + "px; height: " + newHeight + "px;");
                }

                //after arange a row, reset variables for the next row:
                rowWidth = 0;
                rowWidthReal = 0;
                space = 0;
                rowArray = [];
                rowArray.push(i);
                rowWidthReal += targetElm.children[i].offsetWidth;
                rowWidth += targetElm.children[i].offsetWidth;
            }else if(i === elmLength - 1){
                rowWidthReal += targetElm.children[i].offsetWidth;
                rowArray.push(i);
                rowWidth += targetElm.children[i].offsetWidth;
                space = (elmWidth - rowWidthReal - 70) / rowArray.length;
                for(let j=0; j<rowArray.length;j++){
                    let rowIndex = rowArray[j];
                    let newWidth = targetElm.children[rowIndex].offsetWidth + space;
                    let newHeight = targetElm.children[rowIndex].offsetHeight + space;
                    let imgElm = targetElm.children[rowIndex].children[0];
                    imgElm.setAttribute('style', "width: " + newWidth + "px; height: " + newHeight + "px;");
                }
            }else{
                rowWidthReal += targetElm.children[i].offsetWidth;
                rowArray.push(i);
            }
        }
    };
//B. for slideBox-modal:
    showImg = (index) => {
        //B-1. check if the new index is valid.
        if(index === 'pre'){
            if(this.state.modal.selectedIndex - 1 < 0){
                index = this.props.files.length - 1;;
            }else{
                index = this.state.modal.selectedIndex - 1;
            }
        }else if(index === 'next'){
            if(this.state.modal.selectedIndex + 1 > (this.props.files.length-1) ){;
                index = 0;
            }else{
                index = this.state.modal.selectedIndex + 1;
            }
        }else{
            if(index < 0 && index > this.props.files.length-1) return;
        }
        //B-2. update state.modal obj
        let modal = {
            modalIsOpen: true,
            selectedIndex: index,
        };
        this.setState({modal});
        //B-3. update elements className to show or hide the image-wrapper
        let imgElms = document.getElementsByClassName('slideShowWrapper__imgWrapper');
        let activeImgElm = document.getElementsByClassName('slideShowWrapper__imgWrapper__active');
        if(activeImgElm.length !== 0){
            //clear active elm:
            for(let i=0;i<activeImgElm.length; i++){
                activeImgElm[i].classList.remove('slideShowWrapper__imgWrapper__active');
            }
        }
        imgElms[index].classList.add('slideShowWrapper__imgWrapper__active');
    };
    clearSelectedImg = () => {
        //this will make the slideShowWrapper invisible, it's the parent of all the slideShowWrapper.
        //and when there is a new active element, the origin active element will be removed.
        //so it is not necessary to remove the active class in this function.
        const modal = {
            modalIsOpen: false,
            selectedIndex: 0,
        }
        this.setState({modal});
    };
    handleKeypress = (e) => {
        if(this.state.modal.modalIsOpen){
            if(e.keyCode == "37"){         //left
                this.showImg('pre');
            }else if(e.keyCode == "39"){   //right
                this.showImg('next');
            }else if(e.keyCode == "27"){   //esc
                this.clearSelectedImg();
            }
        }
    };
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeypress);
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeypress);
        window.removeEventListener('resize', this.handleResize);
    }
    render(){
        return(
            <div>
                <div id='photoBlockWrapper' className='photoBlockWrapper'>
                    {this.props.files.map((file, index) => {
                        return <GalleryImg 
                            key={index} 
                            data={file} 
                            index={index}
                            showImg={this.showImg}
                        />
                    })}
                </div>
                <GalleryModal 
                    files={this.props.files} 
                    showImg={this.showImg} 
                    clearSelectedImg={this.clearSelectedImg}
                    flickrHosted={this.props.flickrHosted}
                    selectedIndex={this.state.modal.selectedIndex}
                    modalIsOpen={this.state.modal.modalIsOpen}
                    showImg={this.showImg}
                />
            </div>
        );
    }
}

export default GalleryGrid;
