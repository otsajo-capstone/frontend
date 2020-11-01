import React from 'react';
import Layout from '../components/Layout';
import {
    Grid,
    Image,
    Segment,
    Header,} from 'semantic-ui-react'
import mainImage from '../image/mainImage.jpg';

const Home = () => {
    return(
        <div>
            <Grid.Column style={{ position: "relative", display: "flex"}}>                
            <Image src={mainImage} />
            <div
            style={{position: "absolute",
            bottom: 160,
            width: '100%',
            height: 'auto',
            textAlign: 'center',
            fontSize: '8em',
            color: 'white'}}>
                COLOR FIT
            </div>
            <div
            style={{position: "absolute",
            bottom: 160,
            width: '100%',
            height: 'auto',
            textAlign: 'center',
            fontSize: '1.2em',
            color: 'white'}}>
                Join us and Get your color
            </div>
            </Grid.Column>

            <Layout>

                <Segment style={{ padding: '0em', color: 'grey' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column style={{ paddingBottom: '4em', paddingTop: '4em' }}>
                            <Header style={{color: 'grey'}} icon='user circle outline' />
                            <p style={{ fontSize: '1.33em' }}>
                                간단한 회원 가입만 하면<br/>서비스를 이용할 수 있어요.
                            </p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '4em', paddingTop: '4em' }}>
                            <Header style={{color: 'grey'}} icon='magic' />
                            <p style={{ fontSize: '1.33em' }}>
                            링크나 사진 파일만 있으면<br/>옷 컬러 분석을 자동으로 받을 수 있어요.
                            </p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '4em', paddingTop: '4em' }}>
                            <Header style={{color: 'grey'}} icon='file image outline' />
                            <p style={{ fontSize: '1.33em' }}>
                            내가 저장한 옷 카드들을 확인해보세요.</p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '4em', paddingTop: '4em' }}>
                            <Header style={{color: 'grey'}} icon='heart outline' />
                            <p style={{ fontSize: '1.33em' }}>
                            같은 퍼스널 컬러를 가진 사용자들의 옷장을 구경하고<br/>댓글과 좋아요를 남겨주세요.</p>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>

                <Segment style={{ padding: '8em 2em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            온라인 쇼핑 중에 어떤 옷의 컬러가 나에게 가장 맞을지 고민 해본 적 있나요?
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            해당 홈페이지 링크를 복사해서 COLOR FIT에서 분석을 받아보세요.
                            퍼스널 컬러와 비교해서 어울리는 순으로 추천받을 수 있어요.</p>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            컬러를 분석해보고 싶은 옷 사진 파일을 가지고 있나요?
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            원하는 사진 파일들을 간단하게 드래그해서 직접 업로드 해보세요.
                            </p>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment style={{ padding: '8em 2em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        나의 드레스룸 보기
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        분석한 옷의 정보와 사진이 자동으로 저장되어 있어요.
                        다른 사람들에게 공개할 수도 있고, 나만 분석용으로 볼 수 도 있어요.
                        </p>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        다른 드레스룸 둘러보기
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            다른 사람들의 옷들도 둘러보고 댓글과 반응을 남겨주세요. 같은 퍼스널 컬러 별로 묶어서 볼 수도 있어요.
                        </p>
                    </Grid.Row>
                </Grid>
                </Segment>

            </Layout>
        </div>
    );
};

export default Home;
