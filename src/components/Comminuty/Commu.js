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
  Dimmer, Grid, Icon, Comment, Form, Label
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
      r_rlist: [],
      like: 0,
      reply: "",
      update_state: false,
      new_reply: "",
      del_state: false,
      rid: null,
      clickedReply: null,
      rrply_state: false,
    };
  }

  componentDidMount = async e => {
    const response =
      await Axios.get("http://localhost:8080/colorfit/yourDressRoom/select/"
      + String(this.props.colorType));
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateDressList = async () => {
    const response = await Axios.get("http://localhost:8080/colorfit/yourDressRoom/select/"
      + String(this.props.colorType));
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
        like: data.intResult,
        r_rlist: data.rrlist,
        rrply_state: false
      })
    }
  }

  handleClickHeartEvent = async () => {
    var cardKey = this.state.clickedCard.key
    var formdata = new FormData();
    formdata.append('dress_uid', cardKey);
    formdata.append('mb_uid', this.props.memberId);

    var response;
    if (this.state.like === 0) {
      response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/likeDress/",
        formdata);

      this.setState({
        like: 1
      })
    }
    else {
      response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/unlikeDress/",
        formdata);

      this.setState({
        like: 0
      })
    }

    if (response.data.status === 200) {
      await this.updateDressList();
      var newCard = this.state.dresslist.find(d => d.key === cardKey);
      this.setState({
        clickedCard: newCard
      })
    }
    else {
    }
  }

  handleAddReplyEvent = async () => {
    //reply
    if (!this.state.rrply_state) {
      var cardKey = this.state.clickedCard.key
      var formdata = new FormData();
      formdata.append('dress_uid', cardKey);
      formdata.append('mb_uid', this.props.memberId);
      formdata.append('reply_content', this.state.reply);

      const response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/insertReply/", formdata);

      if (response.data.status === 200) {
        const dbresponse = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
          + String(cardKey) + "/" + String(this.props.memberId));

        this.setState({
          rlist: dbresponse.data.rlist,
          reply: ""
        })
      }
      else {
      }
    }

    //re-reply
    else {
      var formdata = new FormData();
      formdata.append('reply_uid', this.state.clickedReply.reply_uid);
      formdata.append('mb_uid', this.props.memberId);
      formdata.append('rereply_content', this.state.reply);

      const response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/insertRereply/", formdata);

      if (response.data.status === 200) {
        const dbresponse = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
          + String(cardKey) + "/" + String(this.props.memberId));

        this.setState({
          reply: "",
          clickedReply: null,
          rrply_state: false
        })
      }
      else {
      }
    }
  }

  handleUpdateReplyEvent = async () => {
    var formdata = new FormData();
    formdata.append('reply_uid', this.state.rid);
    formdata.append('reply_content', this.state.new_reply);

    const response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/updateReply/", formdata);

    if (response.data.status === 200) {
      const dbresponse = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
        + String(this.state.clickedCard.key) + "/" + String(this.props.memberId));

      this.setState({
        rlist: dbresponse.data.rlist,
        update_state: false,
        new_reply: ""
      })
    }
    else {
    }
  }

  handleClickUpdate = async (reply_uid, reply_content) => {
    this.setState({
      update_state: true,
      rid: reply_uid,
      new_reply: reply_content
    })
  }

  closeUpdate = async e => {
    this.setState({
      update_state: false
    })
  }

  handleDeleteReplyEvent = async () => {
    const response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/deleteReply/"
      + String(this.state.rid));

    if (response.data.status === 200) {
      const dbresponse = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
        + String(this.state.clickedCard.key) + "/" + String(this.props.memberId));

      this.setState({
        rlist: dbresponse.data.rlist,
        del_state: false
      })
    }
    else {
    }
  }

  handleClickDeletion = async (reply_uid) => {
    this.setState({
      del_state: true,
      rid: reply_uid
    })
  }

  closeDeletion = async e => {
    this.setState({
      del_state: false
    })
  }

  handleClickReply = async (reply) => {
    if (this.state.clickedReply === null || this.state.clickedReply.reply_uid !== reply.reply_uid) {
      this.setState({
        clickedReply: reply,
        rrply_state: true
      })
    }
    else {
      this.setState({
        clickedReply: null,
        rrply_state: false
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
                <Header style={{ fontFamily: ['Inter', 'NotoSansKR'] }}>
                  <div>
                    <Button style={{ backgroundColor: seasonColor[1] }}>
                      <div style={{ color: 'white' }}>{season[1]}</div></Button>
                             사용자들의 옷장입니다.</div>
                </Header>

                <Segment.Inline>
                  <Card.Group itemsPerRow={4}>
                    {this.state.dresslist.map(
                      card => <Card fluid
                        onClick={() => this.handleClickCardEvent(card)}
                        style={{ textDecoration: 'none' }}>
                        <Card.Content>
                          <Card.Header textAlign='left' style={{ fontFamily: ['Inter', 'NotoSansKR'] }}>
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
                            <Grid.Column>
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
                                      <Icon name='heart' color='red' link onClick={this.handleClickHeartEvent} />}
                                    {this.state.like === 0 &&
                                      <Icon name='heart outline' color='red' link onClick={this.handleClickHeartEvent} />}
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
                                            <Comment.Action
                                              onClick={() => this.handleClickReply(reply)}
                                            >댓글달기</Comment.Action>
                                            {reply.mb_uid === this.props.memberId &&
                                              <Comment.Action
                                                onClick={() => this.handleClickUpdate(reply.reply_uid, reply.reply_content)}
                                              >수정하기</Comment.Action>}
                                            {reply.mb_uid === this.props.memberId &&
                                              <Comment.Action
                                                onClick={() => this.handleClickDeletion(reply.reply_uid)}
                                              >삭제하기</Comment.Action>}
                                          </Comment.Actions>
                                        </Comment.Content>
                                        {this.state.r_rlist !== null &&
                                          <Comment.Group>
                                            {this.state.r_rlist.map((rereply) =>
                                              <Comment>
                                                <Comment.Content>
                                                  <Comment.Author>{rereply.mb_name}</Comment.Author>
                                                  <Comment.Text>{rereply.rereply_content}</Comment.Text>
                                                </Comment.Content>
                                              </Comment>
                                            )}
                                          </Comment.Group>}
                                      </Comment>
                                    )}
                                    <Form reply>
                                      {this.state.rrply_state &&
                                        <Label style={{
                                          padding: '0.6rem', margin: '0.3rem',
                                          backgroundColor: '#dfe5ed', color: '#3386f5'
                                        }}>
                                          @{this.state.clickedReply.mb_name}
                                        </Label>
                                      }
                                      <Form.TextArea
                                        name='reply'
                                        value={this.state.reply}
                                        onChange={this.handleChange}>

                                      </Form.TextArea>
                                      <Button
                                        content='저장'
                                        labelPosition='left'
                                        icon='edit'
                                        primary
                                        onClick={this.handleAddReplyEvent} />
                                    </Form>
                                  </Comment.Group>
                                </Item.Content>
                              </Item>
                            </Container>
                          </Grid.Row>
                        </Grid>
                      </Modal.Content>

                      {(this.state.update_state) &&
                        <Modal
                          style={{ position: 'relative', maxHeight: '30%' }}
                          closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                          open={this.state.update_state}
                          onClose={this.closeUpdate}
                        >
                          <Modal.Header>댓글 수정하기</Modal.Header>
                          <Modal.Content scrolling>
                            <Form reply>
                              <Form.TextArea
                                name='new_reply'
                                value={this.state.new_reply}
                                onChange={this.handleChange} />
                            </Form>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              icon='check'
                              content='저장하기'
                              onClick={this.handleUpdateReplyEvent}
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
                          <Modal.Header>댓글 삭제하기</Modal.Header>
                          <Modal.Content>
                            <p>'{this.state.rlist.find(r => r.reply_uid === this.state.rid).reply_content}'
                      댓글을 삭제하시겠습니까?</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              icon='check'
                              content='확인'
                              onClick={this.handleDeleteReplyEvent}
                            />
                          </Modal.Actions>
                        </Modal>}

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