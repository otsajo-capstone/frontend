import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {
  Item,
  Button,
  Image,
  Segment,
  Modal,
  Header,
  Card,
  Container,
  Dimmer,
  Loader, Divider, Grid, Icon, Accordion, Comment, Form
} from 'semantic-ui-react';
import CanvasJSReact from '../react-canvasjs-chart-samples/react-canvasjs-chart-samples/src/assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const season = ["봄 웜", "여름 쿨", "가을 웜", "겨울 쿨"]
const seasonColor = ["#c4ca2e", "#e74f72", "#875f37", "#293686"]

class Commu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dresslist: [],
      clicked: false,
      clickedCard: [],
      ddto: [],
      rlist: [],
      like: 0
    };
  }

  componentDidMount = async e => {
    const response =
      await Axios.get("http://localhost:8080/colorfit/yourDressRoom/select/"
        + String(2));
    //+ String(this.props.colorType))
    const { data } = response;

    if (data.status === 200) {
      const Items = data.dlist.map((item) =>
        <li
          key={item.dress_uid}
          mb_id={item.mb_id}
          mb_name={item.mb_name}
          mb_type={item.mb_type}
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
          result={(JSON.parse(item.result)).map(r =>
            <li
              key={r.type + "-" + r.subtype}
              type={r.type}
              ratio={parseFloat(r.ratio)}
              subtype={r.subtype}
            />)}
        />
      )
      this.setState({
        dresslist: Items
      })
      console.log('list:', Items);
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
      this.setState({
        clicked: !this.state.clicked,
        clickedCard: card,
        ddto: data.ddto,
        rlist: data.rlist,
        like: data.intResult
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
        <Grid container style={{ padding: '5em 0em' }}>
          <Grid.Row>
            <Grid.Column>
              <Segment
                attached='bottom'
                textAlign='center'
                placeholder>
                <Header>
                  <div>
                    <Button style={{ backgroundColor: seasonColor[1] }}>
                      <div style={{
                        fontFamily: ['Inter', 'NotoSansKR'],
                        color: 'white'
                      }}>{season[1]}</div></Button>
                             사용자들의 옷장입니다.
                                    </div>
                </Header>

                <Segment.Inline>
                  <Card.Group itemsPerRow={4}>
                    {this.state.dresslist.map(
                      card => <Card fluid
                        onClick={() => this.handleClickCardEvent(card)}
                        style={{ textDecoration: 'none' }}>
                        <Card.Content>
                          <Card.Header textAlign='left'>
                            <Icon name='user circle' />
                            {card.props.mb_name}</Card.Header>
                        </Card.Content>
                        <Image src={card.props.dress_img_org}
                          style={{ objectFit: 'cover' }} />
                        <Card.Content>
                          <Card.Description>
                            <div>
                              <Icon name='square full' style={{ color: card.props.color[0].key }} />
                              <Icon name='square full' style={{ color: card.props.color[1].key }} />
                              <Icon name='square full' style={{ color: card.props.color[2].key }} />
                            </div>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Icon name='heart' color='red' />
                          {card.props.likes} 좋아요 &nbsp;
                                                </Card.Content>
                      </Card>
                    )}
                  </Card.Group>

                  {(this.state.clicked) &&
                    <Modal
                      style={{ position: 'relative', width: '80%', maxHeight: '100%' }}
                      closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                      dimmer='inverted'
                      open={this.state.clicked}
                      onClose={this.closeDimmer}
                    >
                      <Modal.Header>상세 정보 보기</Modal.Header>
                      <Modal.Content image scrolling>
                        <Grid fluid>
                          <Grid.Row columns={2}>
                            <Grid.Column>
                              <Image size='huge'
                                style={{
                                  position: 'relative',
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                                src={this.state.clickedCard.props.dress_img_org} wrapped />
                            </Grid.Column>
                            <Grid.Column >
                              <Modal.Description>
                                <Container>
                                  <Item.Group divided>
                                    <Item>
                                      <Item.Content>
                                        <Item.Header>
                                          <Icon name='file' color='grey' /> 이름</Item.Header>
                                        <Item.Description>
                                          {this.state.clickedCard.props.dress_name}
                                        </Item.Description>
                                      </Item.Content>
                                    </Item>
                                    <Item>
                                      <Item.Content>
                                        <Item.Header>
                                          <Icon name='chart pie' color='grey' />컬러 정보</Item.Header>
                                        <Item.Description>
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

                                          {this.state.clickedCard.props.result.map(
                                            s => <Card.Description>
                                              <div style={{ color: seasonColor[season.indexOf(s.props.type)] }}>
                                                {s.key} : {(s.props.ratio * 100).toFixed(2)}%
                                                                </div>
                                            </Card.Description>
                                          )}

                            나와 어울리는 정도 : {
                                            ((((season.indexOf(this.state.clickedCard.props.result[0].props.type) + 1 === this.props.colorType) &&
                                              (parseFloat(this.state.clickedCard.props.result[0].props.ratio) * 100))
                                              ||
                                              (((season.indexOf(this.state.clickedCard.props.result[0].props.type) + 2) % 4 + 1 === this.props.colorType) &&
                                                (parseFloat(this.state.clickedCard.props.result[0].props.ratio) * 70))
                                              ||
                                              0.0
                                            )
                                              +
                                              (((season.indexOf(this.state.clickedCard.props.result[1].props.type) + 1 === this.props.colorType) &&
                                                (parseFloat(this.state.clickedCard.props.result[1].props.ratio) * 100))
                                                ||
                                                (((season.indexOf(this.state.clickedCard.props.result[1].props.type) + 2) % 4 + 1 === this.props.colorType) &&
                                                  (parseFloat(this.state.clickedCard.props.result[1].props.ratio) * 70))
                                                ||
                                                0.0
                                              )
                                              +
                                              (
                                                (this.state.clickedCard.props.result.length === 3) && (
                                                  (((season.indexOf(this.state.clickedCard.props.result[2].props.type) + 1 === this.props.colorType) &&
                                                    (parseFloat(this.state.clickedCard.props.result[2].props.ratio) * 100))
                                                    ||
                                                    (((season.indexOf(this.state.clickedCard.props.result[2].props.type) + 2) % 4 + 1 === this.props.colorType) &&
                                                      (parseFloat(this.state.clickedCard.props.result[2].props.ratio) * 70))
                                                    ||
                                                    0.0)
                                                )
                                                || 0.0)).toFixed(2)
                                          }%
                                                                    </Item.Description>
                                      </Item.Content>
                                    </Item>
                                    <Item>
                                      <Item.Content>
                                        <Item.Header>
                                          <Icon name='calendar' color='grey' />
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
                                            <Icon name='linkify' color='grey' />
                              쇼핑몰 링크</Item.Header>
                                          <Item.Description>
                                            <a onClick={() => window.open(this.state.clickedCard.props.dress_link, "_blank")}>
                                              {this.state.clickedCard.props.dress_link}</a>
                                          </Item.Description>
                                        </Item.Content>
                                      </Item>
                                    }
                                  </Item.Group>
                                </Container>
                              </Modal.Description>
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Container wrapped>
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    {this.state.like === 1 &&
                                      <Icon name='heart' color='red' />}
                                    {this.state.like === 0 &&
                                      <Icon name='heart outline' color='red' />}
                                    {this.state.clickedCard.props.likes} 좋아요 &nbsp;
                                                            <Icon name='comment alternate' color='olive' />
                                    {this.state.rlist.length} 댓글
                                                        </Item.Header>
                                  <Comment.Group>
                                    {this.state.rlist.map((reply) =>
                                      <Comment>
                                        <Comment.Content>
                                          <Comment.Author>{reply.mb_name}</Comment.Author>
                                          <Comment.Text>{reply.reply_content}</Comment.Text>
                                          <Comment.Actions>
                                            <Comment.Action>대댓글달기</Comment.Action>
                                            {reply.mb_uid === this.props.memberId && <Comment.Action>수정하기</Comment.Action>}
                                            {reply.mb_uid === this.props.memberId && <Comment.Action>삭제하기</Comment.Action>}
                                          </Comment.Actions>
                                        </Comment.Content>
                                      </Comment>
                                    )}
                                    <Form reply>
                                      <Form.TextArea />
                                      <Button content='저장' labelPosition='left' icon='edit' primary />
                                    </Form>
                                  </Comment.Group>
                                </Item.Content>
                              </Item>
                            </Container>
                          </Grid.Row>
                        </Grid>
                      </Modal.Content>
                    </Modal>}
                </Segment.Inline>
              </Segment>
            </Grid.Column>
          </Grid.Row></Grid>
      </div>
    )
  }
}
export default withRouter(Commu);