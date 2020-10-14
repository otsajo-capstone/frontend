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
        return (
            <div>
                <Segment style={{ padding: '6em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                    <Grid.Column width={12}>
                        <Header style={{ fontSize: '3em' }}>
                            Registration completed
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            login right now and get your color!
                        </p>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <Button size='massive' color='teal'>
                            <Link to='/login' style={{textDecoration: 'none', color: 'white'}} >LogIn</Link>
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