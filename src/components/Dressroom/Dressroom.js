import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import {
  Segment, Header, Card, Image, Icon,
  Dimmer, Modal, Button, Grid, List,
  Container, Item
} from 'semantic-ui-react';
import CanvasJSReact from '../react-canvasjs-chart-samples/react-canvasjs-chart-samples/src/assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const season = ["봄 웜", "여름 쿨", "가을 웜", "겨울 쿨"]
const seasonColor = ["#c4ca2e", "#e74f72", "#875f37", "#293686"]

class Dressroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mylist: [],
      clicked: false,
      clickedCard: [],
      shoplink: ""
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
        />
      )
      this.setState({
        mylist: Items
      })
      console.log('list:', this.state.mylist);
    }
    else {
      alert('로그인 여부를 확인해주세요.');
    }
  }

  handleClickCardEvent = async (card) => {
    const response = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
      + String(card.key) + "/" + String(this.props.memberId));
    const { data } = response;

    if (data.status === 200) {
      //console.log(data.ddto) //옷
      //console.log(data.rlist) //댓글

      this.setState({
        clicked: !this.state.clicked,
        clickedCard: card,
      })
    }
  }

  closeDimmer = async e => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    return (
      <div>
        <Segment
          attached='bottom'
          textAlign='center'
          placeholder>
          <Header>
            나의 드레스룸</Header>
          <Segment>
            <Card.Group itemsPerRow={4}>
              {this.state.mylist.map(
                card => <Card fluid
                  onClick={() => this.handleClickCardEvent(card)}
                  style={{ textDecoration: 'none' }}>
                  <Image src={card.props.dress_img_org} style={{ objectFit: 'cover' }} />
                  <Card.Header>{card.props.dress_name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{card.props.dress_regDate.slice(5, 10)}</span>
                  </Card.Meta>
                  <Card.Content>
                    <Card.Description>
                      <div style={{ color: card.props.color[0].key }}>
                        <Icon name='square full' />
                        {card.props.color[0].key}
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
                      {card.props.likes} likes</a>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>

            {(this.state.clicked) &&
              <Modal
                style={{ position: 'relative' }}
                closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                dimmer='inverted'
                open={this.state.clicked}
                onClose={this.closeDimmer}
              >
                <Modal.Header>상세 정보 보기</Modal.Header>
                <Modal.Content image scrolling>
                  <Image size='huge'
                    style={{
                      position: 'relative',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    src={this.state.clickedCard.props.dress_img_org} wrapped />
                  <Modal.Description>
                    <Container>
                      <Item.Group divided>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                              <Icon name='file' color='grey'/>
                              이름</Item.Header>
                            <Item.Description>
                              {this.state.clickedCard.props.dress_name}
                            </Item.Description>
                          </Item.Content>
                        </Item>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                            <Icon name='chart pie' color='grey'/>
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
                                dataPoints: [
                                  {
                                    label: this.state.clickedCard.props.color[0].key,
                                    y: this.state.clickedCard.props.color[0].props.ratio,
                                    color: this.state.clickedCard.props.color[0].key
                                  },
                                  {
                                    label: this.state.clickedCard.props.color[1].key,
                                    y: this.state.clickedCard.props.color[1].props.ratio,
                                    color: this.state.clickedCard.props.color[1].key
                                  },
                                  {
                                    label: this.state.clickedCard.props.color[2].key,
                                    y: this.state.clickedCard.props.color[2].props.ratio,
                                    color: this.state.clickedCard.props.color[2].key
                                  },
                                ]
                              }]
                            }} />
                            <CanvasJSChart options={{
                              title: {
                                text: "퍼스널 컬러 비율",
                                fontFamily: "Inter, NotoSansKR",
                                fontSize: 15
                              },
                              animationEnabled: true,
                              height: 260,
                              data: [{
                                type: "pie",
                                dataPoints: [
                                  {
                                    label: season[0],
                                    y: this.state.clickedCard.props.spring,
                                    color: seasonColor[0]
                                  },
                                  {
                                    label: season[1],
                                    y: this.state.clickedCard.props.summer,
                                    color: seasonColor[1]
                                  },
                                  {
                                    label: season[2],
                                    y: this.state.clickedCard.props.autumn,
                                    color: seasonColor[2]
                                  },
                                  {
                                    label: season[3],
                                    y: this.state.clickedCard.props.winter,
                                    color: seasonColor[3]
                                  },
                                ]
                              }]
                            }} />
                            <Item.Description>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                            <Icon name='calendar' color='grey'/>
                              저장한 날짜, 시간</Item.Header>
                            <Item.Description>
                              {this.state.clickedCard.props.dress_regDate}
                            </Item.Description>
                          </Item.Content>
                        </Item>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                            <Icon name='linkify' color='grey'/>
                              쇼핑몰 링크</Item.Header>
                            <Item.Description>
                              <a onClick={() => window.open(this.state.clickedCard.props.dress_link, "_blank")}>
                                {this.state.clickedCard.props.dress_link}</a>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                            <Icon name='sticky note' color='grey'/>
                              메모</Item.Header>
                            <Item.Description>
                              {this.state.clickedCard.props.dress_memo}
                            </Item.Description>
                          </Item.Content>
                        </Item>
                        <Item>
                          <Item.Content>
                            <Item.Header>
                            <Icon name='lock open' color='grey'/>
                              공개 여부</Item.Header>
                            <Item.Description>
                              {(this.state.clickedCard.props.share_type === 1) &&
                                <div>공개 중</div>}
                              {(this.state.clickedCard.props.share_type === 0) &&
                                <div>나만 보는 중</div>}
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Container>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="수정하기"
                    labelPosition='right'
                    icon='edit'
                    color='blue' />
                  <Button
                    content="삭제하기"
                    labelPosition='right'
                    icon='trash alternate'
                    color='black'
                  />
                </Modal.Actions>
              </Modal>
            }
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Dressroom);