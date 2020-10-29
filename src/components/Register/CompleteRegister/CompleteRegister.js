import React, { Component } from 'react';
import {
    Header,
    Segment,
    Grid,
    Button,
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class CompleteRegister extends Component {
    render () {
        const myColor = 'rgb(59, 143, 217)';
        return (
            <div>
                <Segment style={{ padding: '6em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                    <Grid.Column width={11}>
                        <Header style={{ fontSize: '2.2em', fontFamily: ['Inter', 'NotoSansKR'] }}>
                            회원 가입이 완료되었습니다.
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            로그인 후 컬러핏을 둘러보세요!
                        </p>
                    </Grid.Column >
                    <Grid.Column textAlign='center' width={5}>
                        <Button size='massive' color={'teal'} as={Link} to='/login'>
                            로그인
                        </Button>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
            </div>
        );
    };
}

export default CompleteRegister;