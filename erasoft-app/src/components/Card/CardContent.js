import React, { Component } from "react";
import { Card, CardItem, Text, Right, Body, Left, Button } from "native-base";
import { TouchableOpacity } from 'react-native';
// redux
import { connect } from 'react-redux';
import { getArticle, update, remove } from "../../models/Article_models";
class CardContent extends Component {
    handleDetail = (e, id) => {
        this.props.getArticle(id, null)
            .then(res => {
                if (res) {
                    this.props.updateArticle({
                        id: res.id,
                        title: res.title,
                        content: res.content,
                        views: res.views + 1,
                        comments: res.comments
                    })
                }
            })
        this.props.navigation.push('detailArticle', { id: id })
    }
    handleDelete = (e, id) => {
        this.props.removeArticle(id)
            .then(res => {
                this.props.navigation.push('profile')
            })
    }
    render() {
        const { data, page } = this.props
        return (
            <TouchableOpacity onPress={(e, id = data.id) => this.handleDetail(e, id)}>
                <Card >
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{data.title}</Text>
                                <Text note>{data.writer}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            {
                                page === 'article' ?
                                    <Button transparent>
                                        <Text>{data.views} Views</Text>
                                    </Button> :
                                    <Button transparent onPress={() => {
                                        this.props.navigation.push('formArticle', {
                                            form: 'edit',
                                            id: data.id
                                        })
                                    }}>
                                        <Text>Edit</Text>
                                    </Button>
                            }
                        </Left>
                        <Right>
                            {
                                page === 'article' ?
                                    <Button transparent>
                                        <Text>{new Date(data.date_created).toDateString()}</Text>
                                    </Button> :
                                    <Button transparent
                                        onPress={(e, id = data.id) => {
                                            this.handleDelete(e, id)
                                        }}>
                                        <Text>Delete</Text>
                                    </Button>
                            }
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        getArticle: (id, user_id) => dispatch(getArticle(id, user_id)),
        updateArticle: (data) => dispatch(update(data)),
        removeArticle: (id) => dispatch(remove(id))
    }
}
export default connect(null, mapDispatch)(CardContent)