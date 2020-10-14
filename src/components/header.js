import React, { Component, useContext } from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Image,
    Menu,
  } from 'semantic-ui-react'
import logo from '../image/temp_logo.png'
//import  { userContext, onLogin, onLogout } from './UserContext';

class Header extends Component{
    handleClick = async e =>{
        this.props.onLogout();
    }

    render(){
        return(
            <Menu fixed='top'>
                <Container>
                    <Menu.Item header>
                    <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                    COLOR FIT                
                    </Menu.Item>

                    <Menu.Item as={Link} name ='Home' to=''/>
                    <Menu.Item as={Link} name ='Analysis' to='analysis'/>
                    <Menu.Item as='a' name ='Dress Room'/>

                    <Menu.Menu position='right'>
                        { !this.props.logged && <Menu.Item as={Link} name='Log In' to='login'/>}
                        { !this.props.logged && <Menu.Item as={Link} name='Sign Up' to='signup'/>}
                        { this.props.logged && <Menu.Item as='a' name ='My Page'/>}
                        { this.props.logged && <Menu.Item as='a' name ='Logout' onClick={this.handleClick}/>}
                    </Menu.Menu>
            
                </Container>
            </Menu>
        )
    }
}

export default Header;