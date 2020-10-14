import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
} from 'semantic-ui-react'

const style = {
    h1: {
      marginTop: '3em',
    },
    h2: {
      margin: '4em 0em 2em',
    },
    h3: {
      marginTop: '0.5em',
      padding: '2em 0em',
    },
    last: {
      marginBottom: '300px', 
    },
    comp: {
        margin:'0.5rem',
        padding:'0.5rem'
    },
    base: {
        marginBottom: '2rem',
    }
}

class RegisterHeader extends Component {
    render() {
        const { number, onClickHome } = this.props;
        const prior = (number > 1) ? '/signup/'+(number - 1) : '/';
        return (
            <div>
                <Container style={style.h3}>
                    { number !== '2' && 
                    <Link to={prior}>
                        <Button 
                        onClick={onClickHome}
                        content='Back'
                        icon='arrow alternate circle left outline'
                        labelPosition='left'/>
                    </Link>}
                    <h1>Join COLORFIT</h1>
                </Container>
            </div>
        );
    };
}

export default RegisterHeader;