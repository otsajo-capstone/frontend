import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Input,
    Button,
    Image,
    Segment,
    Menu,
    Container,
    Icon,
    Header,
    Message,
    Grid,
    Card,
    Checkbox,
    Item
} from 'semantic-ui-react';
import Axios from 'axios';

const linkimage = require('../image/linkimage.png')
const uploadimage = require('../image/uploadimage.png')
/*
class DragDrop extends Component {
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
            this.setState({ drag: true })
        }
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({ drag: false })
        }
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ drag: false })
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
                style={{ display: 'inline-block', position: 'relative' }}
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
*/

class AnalysisMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'link_input',
            url: '',
            result: [],
            files: [],
            saved: []
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({ files: fileList })
    }

    handleLinkAnalysisClick = async (e) => {
        if (true) {
            var formdata = new FormData();
            formdata.append('url', this.state.url);
            formdata.append('width', "");
            formdata.append('height', "");

            const response = await Axios.post(
                "django/url",
                formdata
            );
            const { data } = response;

            if (data.status === "success") {
                /*
                for (let i = 0; i < data.src_list.length; i++) {
                    this.setState({
                        result: this.state.result.concat([{ check: true, url: data.src_list[i] }])
                    })
                }*/

                const Items = data.src_list.map((item) =>
                    <li
                        key={item}
                        check={new Boolean(true)}
                    />
                )

                this.setState({
                    result: Items,
                    activeItem: 'link_output'
                })
            }
            else {
                console.log(response)
            }
        }
        else {
        }
    }

    handleImageAnalysisClick = async (e) => {
        console.log(this.state.files)
        console.log(typeof(this.state.files[0]))

        var formdata = new FormData();
        formdata.append('files', this.state.files);
        
        const response = await Axios.post(
            "django/image/analyze",
            formdata
        );

        console.log(formdata.get('files'))
        const { data } = response;
        console.log(response)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleCheck = (url) => {
        //console.log(this.state.result)
        //console.log('val:', e.target.value)
        const elementsIndex = this.state.result.findIndex(
            element => element.key == url);

        let newArr = [...this.state.result];
        console.log('idx:', elementsIndex)
        //console.log('arr:', newArr[elementsIndex])
        
        let newElement = {...newArr[elementsIndex],
            props: {...newArr[elementsIndex].props, check: !newArr[elementsIndex].props.check}};
        newArr[elementsIndex] = newElement;
        
        this.setState({
            result: newArr
        });
        console.log(newArr)
        //console.log(this.state.result);
    }

    geturlReport = async (e) => {
        var src_list = [];

        for (var item of this.state.result) {
            if (item.props.check == true) {
                console.log(item.key);
                src_list.push(item.key);
            }
        }
        //console.log(src_list);

        var jsondata = JSON.stringify({
            src_list: src_list
        })
        //console.log(jsondata);
        
        const response = await Axios.post(
            "django/url/analyze",
            jsondata,
            {headers: {'Content-Type': 'application/json'}}
        );

        const { data } = response;

        //console.log(response)

        if (data.status === "success") {
            const Items = data.analysis_result.map((item) =>
                <li
                    key={item.name}
                    src={item.src}
                    colors={
                        item.colors.map(color =>
                        <li
                        key={color.hex}
                        ratio={color.ratio}
                        />)
                    }
                />
            )
            //console.log(Items)            
            
            for (var item of data.analysis_result){
                var dbcolor = new String(item.colors);
                console.log(dbcolor);

                var dbrequest = new FormData();
                dbrequest.append('mb_uid', this.props.memberId);
                dbrequest.append('spring', 0); //임시
                dbrequest.append('summer', 0); //임시
                dbrequest.append('autumn', 0); //임시
                dbrequest.append('winter', 0); //임시
                dbrequest.append('color', dbcolor);
                dbrequest.append('dress_name', item.key); //바꿀 수 있게
                dbrequest.append('dress_memo', ''); //바꿀 수 있게
                dbrequest.append('dressImg', item.src)
                dbrequest.append('share_type', 0); //바꿀 수 있게

                const dbresponse = await Axios.post(
                    "/colorfit/analysis/saveResult",
                    dbrequest
                )
                console.log(dbresponse);
            }


            this.setState({
                saved: Items,
                activeItem: 'link_result'
            })
        
        //url유효하지 않으면 response에 data: error:error: "unknown url type: 'abcdfsafs'"

            //스프링으로
        }
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu attached='top' tabular color='teal'>
                    <Menu.Item
                        name='link_input'
                        active={activeItem === 'link_input'
                         || activeItem === 'link_output'
                        || activeItem === 'link_result'}
                        onClick={this.handleItemClick}>
                        사이트 링크로 분석하기
                    </Menu.Item>
                    <Menu.Item
                        name='upload_input'
                        active={activeItem === 'upload_input'}
                        onClick={this.handleItemClick}>
                        이미지 파일로 분석하기
                    </Menu.Item>
                </Menu>

                { (activeItem === 'link_input') &&
                    <Segment
                        attached='bottom'
                        textAlign='center'
                        placeholder>
                        <Header image>
                            <Image circular src={linkimage} />
                            분석할 사이트의 주소를 복사&붙여넣기 하세요
                    </Header>
                        <Segment.Inline>
                            <Input name='url'
                                value={this.state.url}
                                onChange={this.handleChange}
                                placeholder='http://...' />
                            <Button color='teal' onClick={this.handleLinkAnalysisClick}>
                                입력 후 클릭
                        </Button>
                        </Segment.Inline>

                    </Segment>}

                { (activeItem === 'link_output') &&
                    <Segment
                        attached='bottom'
                        textAlign='center'
                        placeholder>
                        <Header>
                            원하는 사진만 체크해 주세요.
                </Header>
                        <Segment>
                            <Card.Group itemsPerRow={4}>
                                {this.state.result.map(
                                    card => <Card fluid>
                                        <Image src={card.key} />
                                        <Card.Content>
                                            <Checkbox
                                                name='result.url'
                                                checked={card.props.check}
                                                onClick={() => this.handleCheck(card.key)}
                                            />
                                        </Card.Content>
                                    </Card>
                                )}
                            </Card.Group>
                        </Segment>
                        <Button color='teal' onClick={this.geturlReport}>
                            선택 후 결과 보기
                        </Button>

                    </Segment>}

                { (activeItem === 'link_result') &&
                    <Segment
                        attached='bottom'
                        textAlign='center'
                        placeholder>
                        <Header> 결과가 나의 옷장에 저장되었습니다.
                             </Header>
                        <Segment>
                        <Card.Group itemsPerRow={4}>
                                {this.state.saved.map(
                                    card => <Card fluid>
                                        <Image src={card.props.src} />
                                        <Card.Content>
                                            {card.props.colors.map(
                                                color => <Card.Description>
                                                    color: {color.key} ratio: {color.props.ratio}
                                                    </Card.Description>
                                            )}
                                        </Card.Content>
                                    </Card>
                                )}
                            </Card.Group>
                        </Segment>

                    </Segment>
                }

                { (activeItem === 'upload_input') &&
                    <Segment
                        attached='bottom'
                        textAlign='center'
                        placeholder>
                        <Header style={{ fontSize: '1.3em',
                        fontFamily: ['Inter', 'NotoSansKR']}}
                        textAlign='center'>
                            <Image circular src={uploadimage} />
                            분석할 사진 파일을 업로드 하세요
                    </Header>
                        <Segment>
                            
                        </Segment>
                        <Button
                            fluid
                            size='large'
                            color='teal'
                            onClick={this.handleImageAnalysisClick}
                        >
                            분석하기
                    </Button>
                    </Segment>
                }

            </div>
        )
    }
}


/*

<DragDrop handleDrop={this.handleDrop}>
                                {this.state.files.length === 0 &&
                                    <div textAlign='center'>
                                        이 창에 이미지 파일들을 드래그해서 업로드하세요
                            </div>}
                                <div style={{ height: 300, width: 250 }}>
                                    {this.state.files.map((file, i) =>
                                        <div key={i}>{file}</div>)}
                                </div>
                            </DragDrop>
*/

export default withRouter(AnalysisMain);