import React, { Component, useContext } from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Image,
    Menu,
  } from 'semantic-ui-react'
import logo from '../image/temp_logo.png'

class Header extends Component{
    handleClick = async e =>{
        this.props.onLogout();
    }

    render(){
        return(
            <Menu fixed='top'>
                <Container>
                    <Menu.Item header as={Link} to=''>
                        <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                        COLOR FIT              
                    </Menu.Item>

                    <Menu.Item as={Link} name ='의류 컬러분석' to='analysis'/>
                    <Menu.Item as='a' name ='드레스 룸'/>

                    <Menu.Menu position='right'>
                        { !this.props.logged && <Menu.Item as={Link} name='로그인' to='login'/>}
                        { !this.props.logged && <Menu.Item as={Link} name='회원가입' to='signup'/>}
                        { this.props.logged && <Menu.Item as={Link} name ='내 정보' to='mypage'/>}
                        { this.props.logged && <Menu.Item as='a' name ='로그아웃' onClick={this.handleClick}/>}
                    </Menu.Menu>
            
                </Container>
            </Menu>
        )
    }
}

export default Header;