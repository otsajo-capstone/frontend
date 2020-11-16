import React, { Component, useCallback, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Input,
    Button,
    Image,
    Segment,
    Menu,
    Header,
    Card,
    Checkbox,
    Form,
    Progress,
    Dimmer,
    Loader, Divider, Grid,Icon
} from 'semantic-ui-react';
import Axios from 'axios';
import { useDropzone } from 'react-dropzone';
import CanvasJSReact from '../../react-canvasjs-chart-samples/react-canvasjs-chart-samples/src/assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const linkimage = require('../image/linkimage.png')
const uploadimage = require('../image/uploadimage.png')

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('../image/loading/', false, /\.(png|jpe?g|svg)$/));

const season = ["봄 웜", "여름 쿨", "가을 웜", "겨울 쿨"]
const seasonColor = ["#c4ca2e", "#e74f72", "#875f37", "#293686"]

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

/*
function DropZone(props) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps } = useDropzone({ accept: 'image/jpeg, image/png' });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.size} bytes
        </li>
    ));

    return (
        <Container>
            <Segment stacked padded='very'>
                <Container style={{ minHeight: 30 }}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <br />
                        <p>파일을 박스에 드래그 하거나<br /><b>여기를</b> 클릭하세요. (jpg/png)</p>
                        <br />
                    </div>
                </Container>
                <Divider />
                <List>
                    {files.map(
                        file => <List.Item>
                            <List.Icon name='file' />
                            <List.Content>
                                <List.Header>{file.key}</List.Header>
                                <List.Description>{file}</List.Description>
                            </List.Content>
                        </List.Item>)}
                </List>
            </Segment>
        </Container>
    );
}
*/


class AnalysisMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'link_input',
            url: '',
            result: [],
            saved: [],
            file: null,
            progressActive: false,
            loading: false,
            percent: 0,
            loadingImage: []
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    setRandomImage() {
        const min = 0;
        const max = images.length;
        const rand = min + Math.floor(Math.random() * (max - min));

        this.setState({
            loadingImage: images[rand]
        })
    }

    // upload image to analyze color
    onFormSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            loading: true,
            progressActive: true
        })

        const formData = new FormData();
        formData.append('files', this.state.file);

        const config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 70) / progressEvent.total);
                this.setState({
                    percent: percentCompleted
                })
            },
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        this.setRandomImage();

        const response = await Axios.post(
            "http://34.105.97.231:5000/image/analyze",
            formData,
            config
        );

        const { data } = response;

        if (data.status === "success") {
            const config_spring = {
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.floor(((progressEvent.loaded * 30) / progressEvent.total) + 70);
                    this.setState({
                        percent: percentCompleted
                    })
                }
            };

            const Items = data.analysis_result.map((item) =>
                <li
                    key={item.name}
                    src={item.src}
                    colors={
                        item.colors.map(color =>
                            <li
                                key={color.hex}
                                ratio={color.ratio.toFixed(3)}
                            />)
                    }
                    result={
                        item.result.map(season =>
                            <li
                                key={season.type}
                                ratio={season.ratio.toFixed(3)}
                            />)
                    }
                />
            )

            for (var item of Items) {
                var dbcolor = new String("[");
                for (var color of item.props.colors) {
                    dbcolor += "{\"hex\": \"" + String(color.key) +
                        "\", \"ratio\": \"" + String(color.props.ratio) + "\"},"
                }
                dbcolor = dbcolor.slice(0, -1) + "]"

                var spring = 0;
                var summer = 0;
                var autumn = 0;
                var winter = 0;
                for (var season of item.props.result) {
                    if (season.key.includes("봄")){
                        spring = parseInt(season.props.ratio*100);
                    }
                    if (season.key.includes("여름")){
                        summer = parseInt(season.props.ratio*100);
                    }
                    if (season.key.includes("가을")){
                        autumn = parseInt(season.props.ratio*100);
                    }
                    if (season.key.includes("겨울")){
                        winter = parseInt(season.props.ratio*100);
                    }
                }

                var dbrequest = new FormData();
                dbrequest.append('mb_uid', this.props.memberId);
                dbrequest.append('spring', spring); 
                dbrequest.append('summer', summer); 
                dbrequest.append('autumn', autumn); 
                dbrequest.append('winter', winter); 
                dbrequest.append('color', dbcolor);
                dbrequest.append('dress_img_org', item.props.src)
                dbrequest.append('dress_img_sav', item.props.src)
                dbrequest.append('dress_name', item.key); //바꿀 수 있게

                //console.log(dbrequest.get('mb_uid'))
                this.setRandomImage();

                const dbresponse = await Axios.post(
                    "http://localhost:8080/colorfit/analysis/saveImageResult",
                    dbrequest,
                    config_spring
                )
            }

            this.setState({
                saved: Items,
                activeItem: 'result',
                progressActive: false,
                loading: false,
                percent: 0
            })
        }
    }

    onChange(e) {
        //console.log(e.target.files)
        //console.log(e.target.files[0])
        this.setState({ file: e.target.files[0] });
        //console.log(this.state.file)
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
            console.time('크롤링');

            this.setState({
                loading: true,
                progressActive: true
            })

            const config = {
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.floor((progressEvent.loaded * 33) / progressEvent.total);
                    this.setState({
                        percent: percentCompleted
                    })
                },
                onDownloadProgress: (progressEvent) => {
                    let percentCompleted = Math.round(90 + (progressEvent.loaded * 10) / progressEvent.total);
                    console.log(progressEvent.lengthComputable)
                    console.log(percentCompleted);
                }
            };

            var formdata = new FormData();
            formdata.append('url', this.state.url);
            formdata.append('width', "");
            formdata.append('height', "");
            this.setRandomImage();

            const response = await Axios.post(
                "http://34.105.97.231:5000/url",
                formdata,
                config
            );

            const { data } = response;

            console.timeEnd('크롤링');

            if (data.status === "success") {
                const Items = data.src_list.map((item) =>
                    <li
                        key={item}
                        check={false}
                    />
                )
                this.setState({
                    result: Items,
                    activeItem: 'link_output',
                    progressActive: false,
                    loading: false,
                    percent: 0
                })
            }
            else {
                console.log(response);
                this.setState({
                    progressActive: false,
                    loading: false,
                    percent: 0
                })
                alert("다시 시도해 주세요.");
            }
        }
        else {
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    handleCheck = (url) => {
        const elementsIndex = this.state.result.findIndex(
            element => element.key == url);

        let newArr = [...this.state.result];

        let newElement = {
            ...newArr[elementsIndex],
            props: { ...newArr[elementsIndex].props, check: !newArr[elementsIndex].props.check }
        };
        newArr[elementsIndex] = newElement;

        this.setState({
            result: newArr
        });
    }

    geturlReport = async (e) => {
        this.setState({
            loading: true,
            progressActive: true
        })

        const config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                this.setState({
                    percent: percentCompleted
                })
            },
            headers: { 'Content-Type': 'application/json' }
        };

        var src_list = [];

        for (var item of this.state.result) {
            if (item.props.check == true) {
                src_list.push(item.key);
            }
        }
 
        var jsondata = JSON.stringify({
            src_list: src_list
        })
 
        this.setRandomImage();
        console.time('분석');
        const response = await Axios.post(
            "http://34.105.97.231:5000/url/analyze",
            jsondata,
            config
        );

        const { data } = response;
        console.timeEnd('분석');

        if (data.status === "success") {
            const Items = data.analysis_result.map((item) =>
                <li
                    key={item.name}
                    src={item.src}
                    colors={
                        item.colors.map(color =>
                            <li
                                key={color.hex}
                                ratio={color.ratio.toFixed(3)}
                            />)
                    }
                    result={
                        item.result.map(season =>
                            <li
                                key={season.type}
                                ratio={season.ratio.toFixed(3)}
                            />)
                    }
                />
            )

            console.time('DB');
            for (var item of Items) {
                var dbcolor = new String("[");
                for (var color of item.props.colors) {
                    dbcolor += "{\"hex\": \"" + String(color.key) +
                        "\", \"ratio\": \"" + String(color.props.ratio) + "\"},"
                }
                dbcolor = dbcolor.slice(0, -1) + "]"

                var spring = 0;
                var summer = 0;
                var autumn = 0;
                var winter = 0;
                for (var season of item.props.result) {
                    if (season.key.includes("봄")){
                        spring = parseInt(season.props.ratio*100);
                    }
                    if (season.key.includes("여름")){
                        summer = parseInt(season.props.ratio*100);
                    }
                    if (season.key.includes("가을")){
                        autumn = parseInt(season.props.ratio*100);
                    }
                    if (season.key.includes("겨울")){
                        winter = parseInt(season.props.ratio*100);
                    }
                }

                var dbrequest = new FormData();
                dbrequest.append('mb_uid', this.props.memberId);
                dbrequest.append('spring', spring); 
                dbrequest.append('summer', summer); 
                dbrequest.append('autumn', autumn); 
                dbrequest.append('winter', winter); 
                dbrequest.append('color', dbcolor);
                dbrequest.append('dress_link', this.state.url);
                dbrequest.append('dress_img_org', item.props.src);
                dbrequest.append('dress_img_sav', item.props.src);
                dbrequest.append('dress_name', item.key);

                //console.log(dbrequest.get('mb_uid'))
                this.setRandomImage();
                const dbresponse = await Axios.post(
                    "http://localhost:8080/colorfit/analysis/saveLinkResult",
                    dbrequest,
                )
            }
            console.timeEnd('DB');

            this.setState({
                saved: Items,
                activeItem: 'result',
                progressActive: false,
                loading: false,
                percent: 0
            })

            //url유효하지 않으면 response에 data: error:error: "unknown url type: 'abcdfsafs'"
            //스프링으로
        }
    }

    render() {
        const { activeItem } = this.state
        return (
            <div>
                <Grid container style={{ padding: '5em 0em' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Menu attached='top' tabular
                            >
                                <Menu.Item
                                    name='link_input'
                                    active={activeItem === 'link_input'
                                        || activeItem === 'link_output'
                                        || activeItem === 'link_result'}
                                    onClick={this.handleItemClick}
                                    style={{ color: "#5c92d7" }}>
                                    사이트 링크로 분석하기
                    </Menu.Item>
                                <Menu.Item
                                    name='upload_input'
                                    active={activeItem === 'upload_input'}
                                    onClick={this.handleItemClick}
                                    style={{ color: "#5c92d7" }}>
                                    이미지 파일로 분석하기
                    </Menu.Item>
                            </Menu>
                            {(activeItem === 'link_input') &&
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
                                        <Button
                                            style={{ backgroundColor: "#5c92d7" }}
                                            onClick={this.handleLinkAnalysisClick}>
                                            <div style={{
                                                fontFamily: ['Inter', 'NotoSansKR'],
                                                color: 'white'
                                            }}>
                                                입력 후 클릭
                                            </div>
                                        </Button>
                                    </Segment.Inline>
                                    {
                                        (this.state.loading) &&
                                        <Dimmer active inverted>
                                            <Loader
                                                inverted
                                                style={{ color: "#5c92d7" }}
                                                disabled={!this.state.loading}
                                                content='Loading...' />
                                        </Dimmer>
                                    }
                                </Segment>
                            }
                            {(activeItem === 'link_output') &&
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
                                                    <Image src={card.key} 
                                                    style={{ objectFit: 'cover'}}/>
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
                                    <Button
                                        style={{ backgroundColor: "#5c92d7" }}
                                        onClick={this.geturlReport}>
                                        <div style={{
                                            fontFamily: ['Inter', 'NotoSansKR'],
                                            color: 'white'
                                        }}>
                                            선택 후 결과 보기</div>
                                    </Button>
                                    {
                                        (this.state.loading) &&
                                        <Dimmer active inverted>
                                            <Loader
                                                inverted
                                                disabled={!this.state.loading}
                                                style={{ color: "#5c92d7" }}
                                                content='Loading...' />
                                        </Dimmer>
                                    }
                                </Segment>}
                            {(activeItem === 'result') &&
                                <Segment
                                    attached='bottom'
                                    textAlign='center'
                                    placeholder>
                                    <Header> 결과를 확인하세요.
                                    마이 드레스룸에서 저장된 결과를 다시 볼 수 있어요.
                             </Header>
                                    <Segment>
                                        <Card.Group itemsPerRow={4}>
                                            {this.state.saved.map(
                                                card => <Card fluid>
                                                    <Image src={card.props.src}
                                                    style={{ objectFit: 'cover'}} />
                                                    <Card.Content>
                                                        {card.props.colors.map(
                                                            color => <Card.Description>
                                                                <div style={{ color: color.key }}>
                                                                    <Icon name='square full' /> : { (color.props.ratio*100).toFixed(2)}%
                                                                </div>
                                                            </Card.Description>
                                                        )}
                                                    </Card.Content>
                                                    <Card.Content>
                                                    {card.props.result.map(
                                                            s => <Card.Description>
                                                                <div style={{ color: seasonColor[season.indexOf(s.key)] }}>
                                                                    {s.key} : { (s.props.ratio*100).toFixed(2)}%
                                                                </div>
                                                            </Card.Description>
                                                        )}
                                                        </Card.Content>
                                                </Card>
                                            )}
                                        </Card.Group>
                                    </Segment>

                                </Segment>
                            }

                            {(activeItem === 'upload_input') &&
                                <Segment
                                    attached='bottom'
                                    textAlign='center'
                                    placeholder>
                                    <Header>
                                        <Image circular src={uploadimage} />
                            분석할 사진 파일을 업로드 하세요
                    </Header>
                                    <div className="content">
                                        <Form>
                                            <form onSubmit={this.onFormSubmit}>
                                                <input type="file"
                                                    name="myImage"
                                                    onChange={this.onChange} />
                                            </form>
                                        </Form>
                                    </div>
                                    <Button
                                        fluid
                                        size='large'
                                        style={{ backgroundColor: "#5c92d7" }}
                                        onClick={this.onFormSubmit}
                                    >
                                        <div style={{
                                            fontFamily: ['Inter', 'NotoSansKR'],
                                            color: 'white'
                                        }}>
                                            분석하기</div>
                                    </Button>
                                    {
                                        (this.state.loading) &&
                                        <Dimmer active inverted>
                                            <Loader
                                                inverted
                                                disabled={!this.state.loading}
                                                style={{ color: "#5c92d7" }}
                                                content='Loading...' />
                                        </Dimmer>
                                    }
                                </Segment>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {
                                (this.state.loading) &&
                                <Segment
                                    attached='bottom'
                                    textAlign='center'
                                    placeholder>
                                    <Header> 컬러별 팁!</Header>
                                    <Image src={this.state.loadingImage} />
                                </Segment>
                            }

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}


/*
//progress 못짠거
{
                    <Progress
                        active={this.state.loading}
                        disabled={!this.state.loading}
                        percent={this.state.percent}
                        color='blue'
                    />
                }

                //chart 사용 예시
                <div>
                    <CanvasJSChart options={options}
                    />
                </div>

                //dreapdrop 초안
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