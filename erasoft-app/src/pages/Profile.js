import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Button } from "native-base";
import CardProfile from "../components/Card/CardProfile";
import Footer from '../components/Layout/FooterApp';

import { connect } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
import { getArticle, remove } from "../models/Article_models";
import HeaderApp from "../components/Layout/HeaderApp";
import CardContent from "../components/Card/CardContent";

class Profile extends Component {
    state = {
        article: [],
        user: {}
    }
    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            if (result) this.setState({ user: JSON.parse(result) })
            //get article
            this.props.getArticle(null, this.state.user.id)
                .then((res) => { this.setState({ article: res }) })
        })
    }
    handleLogout = () => {
        AsyncStorage.clear((err)=>{
            if(!err) this.props.navigation.push('login')
        })
    }
    render() {
        const {user} = this.state
        let listArticle = <Text></Text>
        const { article } = this.state
        if (article.length > 0) {
            listArticle = article.map(data => {
                return (
                    <CardContent 
                        key={data.id}
                        data={data}
                        navigation={this.props.navigation}
                        page="profile" />
                )
            })
        }
        return (
            <Container>
                <HeaderApp title="Profile" />
                <Content padder>
                    <Card style={{ padding: 6 }}>
                        <CardItem header bordered>
                            <Text>My Profile</Text>
                        </CardItem>
                        <CardProfile title="Full Name" value={user.name} />
                        <CardProfile title="Email" value={user.email} />
                        <Button primary block onPress={this.handleLogout}>
                            <Text>Logout</Text>
                        </Button>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text>My Article</Text>
                        </CardItem>
                        {listArticle}
                    </Card>
                </Content>
                <Footer navigation={this.props.navigation} active={true} />
            </Container>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        getArticle: (id, user_id) => dispatch(getArticle(id, user_id)),
        removeArticle: (id) => dispatch(remove(id))
    }
}
export default connect(null, mapDispatch)(Profile)