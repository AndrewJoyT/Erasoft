import React from 'react'
import { Container, Content,  Text } from 'native-base';
// redux
import { connect } from 'react-redux';
import { getArticle } from '../models/Article_models';
// asycn storage
import AsyncStorage from '@react-native-community/async-storage';
// core component
import HeaderApp from '../components/Layout/HeaderApp'
import CardContent from '../components/Card/CardContent';
import Footer from '../components/Layout/FooterApp';
import { action } from '../config/Redux/Action/actionType';
class Article extends React.Component {
    componentDidMount() {
        // cek login 
        // set & get user
        AsyncStorage.getItem('user', (err, result) => {
            if (result) { this.props.setUser(JSON.parse(result)) }
        })
        // set & get article
        this.props.getArticle()
            .then((res) => { this.props.setArticle(res) })
    }
    render() {
        let listArticle = <Text></Text>
        const { article } = this.props
        if (article.length > 0) {
            listArticle = article.map(data => {
                return ( <CardContent key={data.id} data={data} 
                        navigation={this.props.navigation} page="article" /> )
            })
        }
        return (
            <>
                <Container>
                    <HeaderApp title="Article" />
                    <Content>
                        {listArticle}
                    </Content>
                    <Footer navigation={this.props.navigation} active={true} />
                </Container>
            </>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        getArticle: () => dispatch(getArticle()),
        setArticle: (data) => dispatch({type:action.article,value:data}),
        setUser : (data) => dispatch({type:action.user,value:data})
    }
}
const mapState = (state) => {
    return {
        user: state.user,
        article:state.article
    }
}
export default connect(mapState, mapDispatch)(Article)