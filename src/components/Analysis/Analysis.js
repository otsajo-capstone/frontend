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
                        사이트 링크로 분석하기
                    </Menu.Item>
                    <Menu.Item
                        name='upload'
                        active={activeItem === 'upload'}
                        onClick={this.handleItemClick}>
                        이미지 파일로 분석하기
                    </Menu.Item>
                </Menu>
                
                { (activeItem === 'link') &&
                <Segment
                attached='bottom'
                textAlign='center'
                placeholder>
                    <Header image>
                        <Image circular src={linkimage}/>
                            분석할 사이트의 주소를 복사&붙여넣기 하세요
                    </Header>
                    <Segment.Inline>
                        <Input action='페이지 사진 가져오기'
                        placeholder='http://...'/>
                    </Segment.Inline>

                </Segment>}
                
                { (activeItem === 'upload') &&
                <Segment
                attached='bottom'
                textAlign='center'
                placeholder>
                    <Header image>
                        <Image circular src={uploadimage}/>
                            분석할 사진 파일을 업로드 하세요
                    </Header>
                    <Segment>
                        <DragDrop handleDrop={this.handleDrop}>
                            {this.state.files.length === 0 &&
                            <div textAlign='center'>
                                이 창에 이미지 파일들을 드래그해서 업로드하세요
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
                        분석하기
                    </Button>
                </Segment>
                }
            </div>
        )
    }
}


export default withRouter(Analysis);