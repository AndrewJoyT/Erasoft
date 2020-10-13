import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right } from 'native-base';
import React from 'react';
// redux
import { connect } from 'react-redux';
import { getComment } from '../models/Comment_models';
import { getUser } from '../models/User_models';
import { action } from '../config/Redux/Action/actionType';
// core component
import InputComments from '../components/Form/InputComment';
import CardComment from '../components/Card/CardComment';
import HeaderApp from '../components/Layout/HeaderApp'
import FooterApp from '../components/Layout/FooterApp'

class DetailArticle extends React.Component {
    state = { comment: [],input:false}
    componentDidMount() {
        const { id } = this.props.route.params;
        this.props.getComment(id)
            .then(res => {
                let dataComent = [];
                res.forEach(comment => {
                    this.props.getUser('', comment.user_id)
                        .then(res => {
                            let data = {
                                user: res.name,
                                user_id: res.id,
                                data: comment
                            }
                            dataComent.push(data)
                            this.setState({ comment: dataComent })
                        })
                })
            })
    }
    render() {
        const { article } = this.props
        const {comment} = this.state;
        let listComment = <Text></Text>
        if (comment.length > 0) {
            listComment = comment.map((data, id) => {
                return (
                    <CardComment comment={data} key={id} user={this.props.user.id} navigation={this.props.navigation} />
                )
            })
        }
        return (
            <>
                <Container>
                    <HeaderApp title="Detail Article" />
                    <Content>
                        <Card style={{ flex: 0 }}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>{article.title}</Text>
                                        <Text note>{new Date(article.date_created).toDateString()}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        {article.content}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent
                                        textStyle={{ color: '#87838B' }}
                                        onPress={() => this.setState({input:true})}>
                                        <Text>Comments</Text>
                                    </Button>
                                </Left>
                                <Right>
                                    <Button transparent textStyle={{ color: '#87838B' }}>
                                        <Text>{`${article.views} views`}</Text>
                                    </Button>
                                </Right>
                            </CardItem>
                            {
                                this.state.input ?
                                    <InputComments
                                        id={article.id}
                                        navigation={this.props.navigation} /> : null
                            }
                            <Card style={{ marginBottom: 0 }}>
                                <CardItem header bordered>
                                    <Text>All Comments</Text>
                                </CardItem>
                                {listComment}
                            </Card>
                        </Card>
                    </Content>
                    <FooterApp navigation={this.props.navigation} active={true}/>
                </Container>
            </>
        )
    }
}
const mapState = (state) => {
    return {
        article: state.detailArticle,
        user :state.user,
        input:state.inputComment
    }
}
const mapDispacth = (dispatch) => {
    return {
        getComment: (id) => dispatch(getComment(id)),
        getUser: (email, id) => dispatch(getUser(email, id)),
        setInput : (bool) => dispatch({type:action.inputComment,value:bool})
    }
}

export default connect(mapState, mapDispacth)(DetailArticle);