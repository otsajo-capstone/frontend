import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import {
  Segment, Header, Card, Image, Icon,
  Dimmer, Modal, Button, Grid, List,
  Container, Item, Form, Label, Radio, Tab, Feed
} from 'semantic-ui-react';
import CanvasJSReact from '../react-canvasjs-chart-samples/react-canvasjs-chart-samples/src/assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const season = ["봄 웜", "여름 쿨", "가을 웜", "겨울 쿨"]
const seasonColor = ["#c4ca2e", "#e74f72", "#875f37", "#293686"]

const style = {
  base: {
    margin: '0.5rem',
    padding: '0.5rem',
    backgroundColor: "#deeaf7"
  }
};

class Dressroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mylist: [],
      clicked: false,
      update_state: false,
      del_state: false,
      clickedCard: [],
      rlist: [],
      shoplink: "",
      new_name: "",
      new_memo: "",
      new_type: 0,
    };
  }

  componentDidMount = async e => {
    const response =
      await Axios.get("http://localhost:8080/colorfit/myDressRoom/"
        + String(this.props.memberId))
    const { data } = response;

    if (data.status === 200) {
      const Items = data.dlist.map((item) =>
        <li
          key={item.dress_uid}
          spring={item.spring}
          summer={item.summer}
          autumn={item.autumn}
          winter={item.winter}
          color={(JSON.parse(item.color)).map(c =>
            <li
              key={c.hex}
              ratio={parseFloat(c.ratio)}
              type={c.type}
              subtype={c.subtype}
            />)}
          dress_name={item.dress_name}
          dress_memo={item.dress_memo}
          dress_link={item.dress_link}
          dress_regDate={item.dress_regDate}
          dress_img_org={item.dress_img_org}
          dress_img_sav={item.dress_img_sav}
          share_type={item.share_type}
          likes={item.likes}
          type={[item.spring, item.summer, item.autumn, item.winter].indexOf(Math.max(...[item.spring, item.summer, item.autumn, item.winter]))}
          result={(JSON.parse(item.result)).map(r =>
            <li
              key={r.type}
              ratio={parseFloat(r.ratio)}
            />)}
        />
      )
      this.setState({
        mylist: Items
      })
    }
    else {
      alert('로그인 여부를 확인해주세요.');
    }
  }

  updateDressList = async () => {
    const response =
      await Axios.get("http://localhost:8080/colorfit/myDressRoom/"
        + String(this.props.memberId))
    const { data } = response;

    if (data.status === 200) {
      const Items = data.dlist.map((item) =>
        <li
          key={item.dress_uid}
          spring={item.spring}
          summer={item.summer}
          autumn={item.autumn}
          winter={item.winter}
          color={(JSON.parse(item.color)).map(c =>
            <li
              key={c.hex}
              ratio={parseFloat(c.ratio)}
              type={c.type}
              subtype={c.subtype}
            />)}
          dress_name={item.dress_name}
          dress_memo={item.dress_memo}
          dress_link={item.dress_link}
          dress_regDate={item.dress_regDate}
          dress_img_org={item.dress_img_org}
          dress_img_sav={item.dress_img_sav}
          share_type={item.share_type}
          likes={item.likes}
          type={[item.spring, item.summer, item.autumn, item.winter].indexOf(Math.max(...[item.spring, item.summer, item.autumn, item.winter]))}
          result={(JSON.parse(item.result)).map(r =>
            <li
              key={r.type}
              ratio={parseFloat(r.ratio)}
            />)}
        />
      )
      this.setState({
        mylist: Items
      })
    }
  }

  handleClickCardEvent = async (card) => {
    const response = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
      + String(card.key) + "/" + String(this.props.memberId));
    const { data } = response;

    if (data.status === 200) {
      this.setState({
        clicked: true,
        clickedCard: card,
        new_name: card.props.dress_name,
        new_memo: card.props.dress_memo,
        new_type: card.props.share_type,
        rlist: data.rlist
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleToggleChange = () => {
    var type = this.state.new_type;
    if (type == 1) {
      type = 0;
    }
    else {
      type = 1;
    }

    this.setState({
      new_type: type
    });
  }

  closeDimmer = async e => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleClickUpdate = async () => {
    this.setState({
      update_state: true
    })
  }

  closeUpdate = async e => {
    this.setState({
      update_state: false
    })
  }

  updateFile = async () => {
    var formdata = new FormData();
    formdata.append('dress_uid', this.state.clickedCard.key);
    formdata.append('dress_name', this.state.new_name);
    if (this.state.new_memo != null) {
      formdata.append('dress_memo', this.state.new_memo);
    }
    formdata.append('share_type', this.state.new_type);

    const response = await Axios.post(
      "http://localhost:8080/colorfit/myDressRoom/update/",
      formdata
    );

    await this.updateDressList();

    var card = <li
      key={this.state.clickedCard.key}
      spring={this.state.clickedCard.props.spring}
      summer={this.state.clickedCard.props.summer}
      autumn={this.state.clickedCard.props.autumn}
      winter={this.state.clickedCard.props.winter}
      color={this.state.clickedCard.props.color}
      dress_name={this.state.new_name}
      dress_memo={this.state.new_memo}
      dress_link={this.state.clickedCard.props.dress_link}
      dress_regDate={this.state.clickedCard.props.dress_regDate}
      dress_img_org={this.state.clickedCard.props.dress_img_org}
      dress_img_sav={this.state.clickedCard.props.dress_img_sav}
      share_type={this.state.new_type}
      likes={this.state.clickedCard.props.likes}
      type={this.state.clickedCard.props.type}
      result={this.state.clickedCard.props.result}
    />

    this.setState({
      clickedCard: card,
      update_state: false
    })

  }

  handleClickDeletion = async () => {
    this.setState({
      del_state: true
    })
  }

  closeDeletion = async e => {
    this.setState({
      del_state: false
    })
  }

  deleteFile = async () => {
    console.log(this.state.clickedCard.key);
    const response = await Axios.post(
      "http://localhost:8080/colorfit/myDressRoom/delete/" + String(this.state.clickedCard.key),
    );
    //200 확인..

    await this.updateDressList();

    this.setState({
      clicked: false,
      del_state: false
    })
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Segment
          attached='bottom'
          textAlign='center'
          placeholder>
          <Header style={{ fontFamily: ['NotoSansKR'] }}>
            나의 드레스룸</Header>
          <Segment>
            <Card.Group itemsPerRow={4}>
              {this.state.mylist.map(
                card => <Card fluid
                  onClick={() => this.handleClickCardEvent(card)}
                  style={{ textDecoration: 'none' }}>
                  <Image src={card.props.dress_img_org} style={{ objectFit: 'cover' }} />
                  <Card.Header style={{ fontFamily: ['Inter', 'NotoSansKR'] }}>{card.props.dress_name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{card.props.dress_regDate.slice(5, 10)}</span>
                  </Card.Meta>
                  <Card.Content>
                    <Card.Description>
                      <div>
                        <Icon name='square full' style={{ color: card.props.color[0].key }} />
                        <Icon name='square full' style={{ color: card.props.color[1].key }} />
                        <Icon name='square full' style={{ color: card.props.color[2].key }} />
                      </div>
                      <Button style={{ backgroundColor: seasonColor[card.props.type] }}>
                        <div style={{
                          fontFamily: ['Inter', 'NotoSansKR'],
                          color: 'white'
                        }}>
                          {season[card.props.type]}
                        </div>
                      </Button>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a><Icon name='heart' color='red' />
                      {card.props.likes} 좋아요 </a>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>

            {(this.state.clicked) &&
              <Modal
                style={{ position: 'relative', width: '80%', maxHeight: '80%', fontFamily: ['Inter', 'NotoSansKR'] }}
                closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                dimmer='inverted'
                open={this.state.clicked}
                onClose={this.closeDimmer}
              >
                <Modal.Header>상세 정보 보기</Modal.Header>
                <Modal.Content image scrolling>
                  <Grid fluid>
                    <Grid.Row columns={2}>
                      <Grid.Column className="segment centered">
                        <Image size='huge'
                          style={{
                            display: 'flex',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          src={this.state.clickedCard.props.dress_img_org}
                          wrapped />
                      </Grid.Column>
                      <Grid.Column>
                        <Modal.Description>
                          <Container>
                            <Item.Group divided>
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    <Icon name='file' style={{color: '#fcdada'}}/>이름</Item.Header>
                                  <Item.Description>
                                    {this.state.clickedCard.props.dress_name}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    <Icon name='chart pie' style={{color: '#ffa5a5'}} />
                              컬러 정보</Item.Header>
                                  <CanvasJSChart options={{
                                    title: {
                                      text: "옷에서 추출한 컬러",
                                      fontFamily: "Inter, NotoSansKR",
                                      fontSize: 15
                                    },
                                    animationEnabled: true,
                                    height: 260,
                                    data: [{
                                      type: "pie",
                                      animationEnabled: true,
                                      indexLabelFontSize: 16,
                                      dataPoints: [
                                        {
                                          label: this.state.clickedCard.props.color[0].props.type + "-" + this.state.clickedCard.props.color[0].props.subtype,
                                          y: this.state.clickedCard.props.color[0].props.ratio,
                                          color: this.state.clickedCard.props.color[0].key
                                        },
                                        {
                                          label: this.state.clickedCard.props.color[1].props.type + "-" + this.state.clickedCard.props.color[1].props.subtype,
                                          y: this.state.clickedCard.props.color[1].props.ratio,
                                          color: this.state.clickedCard.props.color[1].key
                                        },
                                        {
                                          label: this.state.clickedCard.props.color[2].props.type + "-" + this.state.clickedCard.props.color[2].props.subtype,
                                          y: this.state.clickedCard.props.color[2].props.ratio,
                                          color: this.state.clickedCard.props.color[2].key
                                        },
                                      ]
                                    }]
                                  }} />

                            나와 어울리는 정도 : {
                                    ((((season.indexOf(this.state.clickedCard.props.result[0].key) + 1 === this.props.colorType) &&
                                      (parseFloat(this.state.clickedCard.props.result[0].props.ratio) * 100))
                                      ||
                                      (((season.indexOf(this.state.clickedCard.props.result[0].key) + 2) % 4 + 1 === this.props.colorType) &&
                                        (parseFloat(this.state.clickedCard.props.result[0].props.ratio) * 70))
                                      ||
                                      0.0
                                    )
                                      +
                                      (
                                        ((this.state.clickedCard.props.result.length >= 2) &&
                                          (((season.indexOf(this.state.clickedCard.props.result[1].key) + 1 === this.props.colorType) &&
                                            (parseFloat(this.state.clickedCard.props.result[1].props.ratio) * 100))
                                            ||
                                            (((season.indexOf(this.state.clickedCard.props.result[1].key) + 2) % 4 + 1 === this.props.colorType) &&
                                              (parseFloat(this.state.clickedCard.props.result[1].props.ratio) * 70))
                                            || 0.0
                                          ))
                                        || 0.0)
                                      +
                                      (
                                        (this.state.clickedCard.props.result.length === 3) && (
                                          (((season.indexOf(this.state.clickedCard.props.result[2].key) + 1 === this.props.colorType) &&
                                            (parseFloat(this.state.clickedCard.props.result[2].props.ratio) * 100))
                                            ||
                                            (((season.indexOf(this.state.clickedCard.props.result[2].key) + 2) % 4 + 1 === this.props.colorType) &&
                                              (parseFloat(this.state.clickedCard.props.result[2].props.ratio) * 70))
                                            ||
                                            0.0)
                                        )
                                        || 0.0)).toFixed(2)
                                  }%
                            <Item.Description>
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    <Icon name='calendar' style={{color: '#5c969e'}}/>
                              저장한 날짜, 시간</Item.Header>
                                  <Item.Description>
                                    {this.state.clickedCard.props.dress_regDate.slice(0, 16)}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              {(this.state.clickedCard.props.dress_link != null) &&
                                <Item>
                                  <Item.Content>
                                    <Item.Header>
                                      <Icon name='linkify' style={{color: '#3d7ea6'}}/>
                              쇼핑몰 링크</Item.Header>
                                    <Item.Description>
                                      <a onClick={() => window.open(this.state.clickedCard.props.dress_link, "_blank")}>
                                        {this.state.clickedCard.props.dress_link}</a>
                                    </Item.Description>
                                  </Item.Content>
                                </Item>
                              }
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    <Icon name='sticky note' style={{color: '#fff3a5'}} />
                              메모</Item.Header>
                                  <Item.Description>
                                    {this.state.clickedCard.props.dress_memo}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    <Icon name='lock open' color='grey' />
                              공개 여부</Item.Header>
                                  <Item.Description>
                                    {(this.state.clickedCard.props.share_type === 0) &&
                                      <div>공개 중</div>}
                                    {(this.state.clickedCard.props.share_type === 1) &&
                                      <div>나만 보는 중</div>}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                            </Item.Group>
                          </Container>
                        </Modal.Description>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={12} />
                      <Grid.Column width={2}>
                        <Button
                          content="수정하기"
                          labelPosition='right'
                          icon='edit'
                          color='blue'
                          onClick={this.handleClickUpdate}
                        />
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Button
                          content="삭제하기"
                          labelPosition='right'
                          icon='trash alternate'
                          color='black'
                          onClick={this.handleClickDeletion}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Container wrapped>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                              <Icon name='heart' color='red' />
                              {this.state.clickedCard.props.likes} 좋아요 &nbsp;
                      <Icon name='comment alternate' color='olive' />
                              {this.state.rlist !== null &&
                                this.state.rlist.length} 댓글
                    </Item.Header>
                          </Item.Content>
                        </Item>
                      </Container>
                    </Grid.Row>
                  </Grid>
                </Modal.Content>

                {(this.state.update_state) &&
                  <Modal
                    style={{ position: 'relative', height: '800px' }}
                    closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                    open={this.state.update_state}
                    onClose={this.closeUpdate}
                  >
                    <Modal.Header>수정하기</Modal.Header>
                    <Modal.Content scrolling>
                      <Form size='large'>
                        <Segment stacked>
                          <Label style={style.base}>이름</Label>
                          <Form.Input
                            fluid
                            value={this.state.new_name}
                            onChange={this.handleChange}
                            name="new_name" />

                          <Label style={style.base}>메모</Label>
                          <Form.Input
                            fluid
                            value={this.state.new_memo}
                            onChange={this.handleChange}
                            name="new_memo" />

                          <div>
                            <Label style={style.base}>공개 여부</Label>
                            <Radio toggle
                              onChange={this.handleToggleChange}
                              checked={this.state.new_type === 0}
                            />
                          </div>
                        </Segment>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        icon='check'
                        content='저장하기'
                        onClick={this.updateFile}
                      />
                    </Modal.Actions>
                  </Modal>}

                {(this.state.del_state) &&
                  <Modal
                    style={{ position: 'relative', height: '200px' }}
                    closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                    open={this.state.del_state}
                    onClose={this.closeDeletion}
                  >
                    <Modal.Header>삭제하기</Modal.Header>
                    <Modal.Content>
                      <p>옷 데이터를 삭제하시겠습니까?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        icon='check'
                        content='확인'
                        onClick={this.deleteFile}
                      />
                    </Modal.Actions>
                  </Modal>}

              </Modal>
            }
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Dressroom);