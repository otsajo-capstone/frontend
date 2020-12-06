import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {
  Segment, Header, Card, Image, Icon,
  Modal, Button, Grid, Comment,
  Container, Item, Form, Label, Radio
} from 'semantic-ui-react';
import CanvasJSReact from '../react-canvasjs-chart-samples/react-canvasjs-chart-samples/src/assets/canvasjs.react';

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
      r_rlist: [],
      shoplink: "",
      new_name: "",
      new_memo: "",
      new_type: 0,
      like: 0,
      
      reply: "",
      r_update_state: false,
      new_reply: "",
      r_del_state: false,
      rid: null,
      clickedReply: null,
      rrply_state: false,
      rrid: null,
      rr_update_state: false,
      new_r_reply: "",
      rr_del_state: false,
    };
  }

  componentDidMount = async e => {
    const response =
      await Axios.get("http://localhost:8080/colorfit/myDressRoom/"
        + String(this.props.memberId))
    const { data } = response;

    if (data.status === 200) {
      var Items = data.dlist;
      Items.sort((a, b) => b.dress_uid - a.dress_uid);
      Items = Items.map((item) =>
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
      var Items = data.dlist;
      Items.sort((a, b) => b.dress_uid - a.dress_uid);
      Items = Items.map((item) =>
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
        rlist: data.rlist,
        like: data.intResult,
        r_rlist: data.rrlist,
        rrply_state: false
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
    if (type === 1) {
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
      clicked: false,
      update_state: false,
      del_state: false,
      clickedCard: [],
      rlist: [],
      r_rlist: [],
      shoplink: "",
      new_name: "",
      new_memo: "",
      new_type: 0,
      like: 0,
      reply: "",
      r_update_state: false,
      new_reply: "",
      r_del_state: false,
      rid: null,
      clickedReply: null,
      rrply_state: false,
      rrid: null,
      rr_update_state: false,
      new_r_reply: "",
      rr_del_state: false,
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

    await Axios.post(
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
      var newCard = this.state.mylist.find(d => d.key === cardKey);
      this.setState({
        clickedCard: newCard
      })
    }
    else {
    }
  }

  handleAddReplyEvent = async () => {
    //reply
    var cardKey = this.state.clickedCard.key
    if (!this.state.rrply_state) {
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

          if (dbresponse.data.status === 200){
            this.setState({
              reply: "",
              clickedReply: null,
              rrply_state: false,
              r_rlist: dbresponse.data.rrlist
            })
          }
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
        r_update_state: false,
        new_reply: ""
      })
    }
    else {
    }
  }

  handleClickUpdateReply = async (reply_uid, reply_content) => {
    this.setState({
      r_update_state: true,
      rid: reply_uid,
      new_reply: reply_content
    })
  }

  closeUpdateReply = async e => {
    this.setState({
      r_update_state: false
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
        r_del_state: false
      })
    }
    else {
    }
  }

  handleClickDeletionReply = async (reply_uid) => {
    this.setState({
      r_del_state: true,
      rid: reply_uid
    })
  }

  closeDeletionReply = async e => {
    this.setState({
      r_del_state: false
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

  handleUpdateRereplyEvent = async () => {
    var formdata = new FormData();
    formdata.append('rereply_uid', this.state.rrid);
    formdata.append('rereply_content', this.state.new_r_reply);

    const response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/updateRereply/", formdata);

    if (response.data.status === 200) {
      const dbresponse = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
        + String(this.state.clickedCard.key) + "/" + String(this.props.memberId));

      this.setState({
        r_rlist: dbresponse.data.rrlist,
        rr_update_state: false,
        new_r_reply: ""
      })
    }
    else {
    }
  }

  handleClickUpdateRerp = async (rereply_uid, rereply_content) => {
    this.setState({
      rr_update_state: true,
      new_r_reply: rereply_content,
      rrid: rereply_uid
    })
  }

  closeUpdateRerp = async e => {
    this.setState({
      rr_update_state: false
    })
  }

  handleDeleteRereplyEvent = async () => {
    const response = await Axios.post("http://localhost:8080/colorfit/yourDressRoom/deleteRereply/"
      + String(this.state.rrid));

    if (response.data.status === 200) {
      const dbresponse = await Axios.get("http://localhost:8080/colorfit/DressRoom/selectDress/"
        + String(this.state.clickedCard.key) + "/" + String(this.props.memberId));

      this.setState({
        r_rlist: dbresponse.data.rrlist,
        rr_del_state: false
      })
    }
    else {
    }
  }

  handleClickDeletionRerp = async (rereply_uid) => {
    this.setState({
      rr_del_state: true,
      rrid: rereply_uid
    })
  }

  closeDeletionRerp = async e => {
    this.setState({
      rr_del_state: false
    })
  }

  render() {
    return (
      <div>
        <Segment
          attached='bottom'
          textAlign='center'
          placeholder>
          <Header style={{ fontFamily: ['NotoSansKR'] }}>
            나의 드레스룸</Header>
          <Segment>
            <Card.Group itemsPerRow={4} stackable>
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
                                    <Icon name='file' style={{ color: '#fcdada' }} />이름</Item.Header>
                                  <Item.Description>
                                    {this.state.clickedCard.props.dress_name}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Item>
                                <Item.Content>
                                  <Item.Header>
                                    <Icon name='chart pie' style={{ color: '#ffa5a5' }} />
                              컬러 정보</Item.Header>
                                  <CanvasJSChart options={{
                                    title: {
                                      text: "옷에서 추출한 컬러",
                                      fontFamily: ["Inter", "NotoSansKR"],
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
                                    <Icon name='calendar' style={{ color: '#5c969e' }} />
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
                                      <Icon name='linkify' style={{ color: '#3d7ea6' }} />
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
                                    <Icon name='sticky note' style={{ color: '#fff3a5' }} />
                              메모</Item.Header>
                                  <Item.Description>
                                    {this.state.clickedCard.props.dress_memo}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Item>
                                <Item.Content>
                                  {(this.state.clickedCard.props.share_type === 0) &&
                                    <Item.Header>
                                      <Icon name='lock open' color='grey' />
                              공개 여부</Item.Header>}
                                  {(this.state.clickedCard.props.share_type === 1) &&
                                    <Item.Header>
                                      <Icon name='lock' color='grey' />
                              공개 여부</Item.Header>}
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
                            {this.state.like === 1 &&
                                      <Icon name='heart' color='red' link onClick={this.handleClickHeartEvent} />}
                                    {this.state.like === 0 &&
                                      <Icon name='heart outline' color='red' link onClick={this.handleClickHeartEvent} />}
                                    {this.state.clickedCard.props.likes} 좋아요 &nbsp;
                      <Icon name='comment alternate' color='olive' />
                              {this.state.rlist !== null &&
                                this.state.rlist.length} 댓글
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
                                                onClick={() => this.handleClickUpdateReply(reply.reply_uid, reply.reply_content)}
                                              >수정하기</Comment.Action>}
                                            {reply.mb_uid === this.props.memberId &&
                                              <Comment.Action
                                                onClick={() => this.handleClickDeletionReply(reply.reply_uid)}
                                              >삭제하기</Comment.Action>}
                                          </Comment.Actions>
                                        </Comment.Content>
                                        
                                        {this.state.r_rlist !== [] &&
                                          <Comment.Group>
                                            {this.state.r_rlist.map((rereply) =>
                                              reply.reply_uid === rereply.reply_uid &&
                                              <Comment>
                                                <Comment.Content>
                                                  <Comment.Author><Icon name='level up' rotated='clockwise'/>{rereply.mb_name}</Comment.Author>
                                                  <Comment.Text style={{paddingLeft: '18px'}}>{rereply.rereply_content}</Comment.Text>
                                                  <Comment.Actions>
                                                  {rereply.mb_uid === this.props.memberId &&
                                              <Comment.Action
                                              onClick={() => this.handleClickUpdateRerp(rereply.rereply_uid, rereply.rereply_content)}
                                              >수정하기</Comment.Action>}
                                            {rereply.mb_uid === this.props.memberId &&
                                              <Comment.Action
                                              onClick={() => this.handleClickDeletionRerp(rereply.rereply_uid)}
                                              >삭제하기</Comment.Action>}
                                                  </Comment.Actions>
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

                  {(this.state.r_update_state) &&
                        <Modal
                          style={{ position: 'relative', maxHeight: '30%' }}
                          closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                          open={this.state.r_update_state}
                          onClose={this.closeUpdateReply}
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

                      {(this.state.r_del_state) &&
                        <Modal
                          style={{ position: 'relative', height: '200px' }}
                          closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                          open={this.state.r_del_state}
                          onClose={this.closeDeletionReply}
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

                        {(this.state.rr_update_state) &&
                        <Modal
                          style={{ position: 'relative', maxHeight: '30%' }}
                          closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                          open={this.state.rr_update_state}
                          onClose={this.closeUpdateRerp}
                        >
                          <Modal.Header>댓글 수정하기</Modal.Header>
                          <Modal.Content scrolling>
                            <Form reply>
                              <Form.TextArea
                                name='new_r_reply'
                                value={this.state.new_r_reply}
                                onChange={this.handleChange} />
                            </Form>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              icon='check'
                              content='저장하기'
                              onClick={this.handleUpdateRereplyEvent}
                            />
                          </Modal.Actions>
                        </Modal>}

                        {(this.state.rr_del_state) &&
                        <Modal
                          style={{ position: 'relative', height: '200px' }}
                          closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
                          open={this.state.rr_del_state}
                          onClose={this.closeDeletionRerp}
                        >
                          <Modal.Header>댓글 삭제하기</Modal.Header>
                          <Modal.Content>
                            <p>'{this.state.r_rlist.find(r => r.rereply_uid === this.state.rrid).rereply_content}'
                      댓글을 삭제하시겠습니까?</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              icon='check'
                              content='확인'
                              onClick={this.handleDeleteRereplyEvent}
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