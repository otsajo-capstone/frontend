import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input,
    Button,
    Image,
    Segment,
    Menu,
    Container,
    Icon,
    Header,
    Grid } from 'semantic-ui-react';

const linkimage = require('./image/linkimage.png')
const uploadimage = require('./image/uploadimage.png')

class DragDrop extends Component{
    state = {
        drag: false
    }

    dropRef = React.createRef()
    
    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          this.setState({drag: true})
        }
    }
    
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
          this.setState({drag: false})
        }
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.props.handleDrop(e.dataTransfer.files)
          e.dataTransfer.clearData()
          this.dragCounter = 0    
        }
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
      }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }
     
    render() {
        return (
        <div
        style={{display: 'inline-block', position: 'relative'}}
        ref={this.dropRef}>
            {this.state.dragging &&
            <div 
            style={{
                border: 'dashed grey 4px',
                backgroundColor: 'rgba(255,255,255,.8)',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0, 
                right: 0,
                zIndex: 9999
            }}>
                <div 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        left: 0,
                        textAlign: 'center',
                        color: 'grey',
                        fontSize: 36
                    }}>
                    <div>drop here :)</div>
                </div>
            </div>
            }
            {this.props.children}
        </div>
        )
    }
}


class Analysis extends Component {
    state = { 
        activeItem: 'link',
        files: []
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
          if (!files[i].name) return
          fileList.push(files[i].name)
        }
        this.setState({files: fileList})
        
      }

    render(){
        const { activeItem } = this.state

        return(
            <div>
                <Menu attached='top' tabular color='teal'>
                    <Menu.Item
                        name='link'
                        active={activeItem === 'link'}
                        onClick={this.handleItemClick}>
                        Upload Website Link
                    </Menu.Item>
                    <Menu.Item
                        name='upload'
                        active={activeItem === 'upload'}
                        onClick={this.handleItemClick}>
                        Upload Image File
                    </Menu.Item>
                </Menu>
                
                { (activeItem === 'link') &&
                <Segment
                attached='bottom'
                textAlign='center'
                placeholder>
                    <Header image>
                        <Image circular src={linkimage}/>
                            Copy and Paste your Website Link
                    </Header>
                    <Segment.Inline>
                        <Input action='Analysis' placeholder='http://...'/>
                    </Segment.Inline>

                </Segment>}
                
                { (activeItem === 'upload') &&
                <Segment
                attached='bottom'
                textAlign='center'
                placeholder>
                    <Header image>
                        <Image circular src={uploadimage}/>
                            Upload your Cloth Image
                    </Header>
                    <Segment>
                        <DragDrop handleDrop={this.handleDrop}>
                            {this.state.files.length === 0 &&
                            <div>
                                Drag and Drop your Image Files Here!
                            </div>}
                            <div style={{height: 300, width: 250}}>
                            {this.state.files.map((file,i) =>
                                <div key={i}>{file}</div>)}
                            </div>
                        </DragDrop>
                    </Segment>
                    <Button
                            fluid
                            size='large'
                            color='teal'
                            >
                            Analysis
                        </Button>
                </Segment>
                    }
                
            </div>
        )
    }
}


export default withRouter(Analysis);