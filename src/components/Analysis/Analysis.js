import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
//import linkimage from '.../image/linkimage.png'

/*
                <Button size='medium'>
                    <Image src={require('./linkimage.png')} fluid/>
                </Button>
                <Button size='medium'>
                    <Image src={require('./uploadimage.png')} fluid/>
                </Button>

*/

const style = {
    buttonstyle: {
        backgroudcolor: '#ea7171'
    }

};

const linkimage = require('./linkimage.png')
const uploadimage = require('./uploadimage.png')
class Analysis extends Component {
    render(){
        return(
            <div>
                <Button >
                    <Image src={linkimage} style={style.buttonstyle}/>
                    <Button.Content>
                        link
                    </Button.Content>
                </Button>
                <Button >
                    <Image src={uploadimage} style={style.buttonstyle}/>
                    <Button.Content>
                        link
                    </Button.Content>
                </Button>
            </div>
        )
    }
}


export default withRouter(Analysis);