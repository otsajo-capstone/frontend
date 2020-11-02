import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Segment, Header, Card, Image, Icon } from 'semantic-ui-react';

class Dressroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mylist: [],
    };
  }

  componentDidMount = async e => {
    const response =
      await Axios.get("http://localhost:8080/colorfit/myDressRoom/"
        + String(this.props.memberId))
    const { data } = response;

    //console.log(data.dlist);
    //console.log(typeof(data.dlist[0]))
    //console.log(data.dlist[0])
    //console.log(data.dlist[0].dress_img_org)
    //console.log(JSON.parse(data.dlist[0].color))

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
          dress_regDate={item.dress_regDate}
          dress_img_org={item.dress_img_org}
          dress_img_sav={item.dress_img_sav}
          share_type={item.share_type}
          likes={item.likes}
        />
      )

      //console.log(Items);

      this.setState({
        mylist: Items
      })

      console.log('list:', this.state.mylist);
    }
    else {
      alert('로그인 여부를 확인해주세요.');
    }
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
            <Card.Group itemsPerRow={3}>
              {this.state.mylist.map(
                card => <Card fluid>
                  <Image src={card.props.dress_img_org} />
                  <Card.Header>{card.props.dress_name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{card.props.dress_regDate.slice(5,10)}</span>
                  </Card.Meta>
                  <Card.Content>
                    {card.props.color.map(
                      c => <Card.Description>
                        color: {c.key} ratio: {c.props.ratio}
                      </Card.Description>
                    )}
                  </Card.Content>
                  <Card.Content extra>
                    <a><Icon name='heart' color='red' />
                      {card.props.likes} likes</a>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </Segment>

        </Segment>
      </div>
    );
  }
}

export default withRouter(Dressroom);