import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, View, Right, Form, Textarea } from 'native-base';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { add,update } from '../../models/Comment_models';
class InputComments extends React.Component {
    state = {
        comment: this.props.value
    }
    handleComment = () => {
        AsyncStorage.getItem('user', (err, result) => {
            const user = JSON.parse(result)
            const data = {
                user_id: user.id,
                text: this.state.comment,
                article_id: this.props.id,
            }
            this.props.addComment(data)
                .then(res => {
                    this.props.navigation.push('detailArticle', { id: this.props.id })
                })
        })
    }
    handleUpdate = () => {
        this.props.updateComment({
            id:this.props.id,
            text:this.state.comment
        }).then((res)=>{
            console.log(res)
            this.props.navigation.push('detailArticle', { id: this.props.article_id })
        })
    }
    render() {
        return (
            <>
                <Content padder>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Comments"
                            value={this.state.comment}
                            onChangeText={(text) => { this.setState({ comment: text }) }} />
                    </Form>
                    <Button block primary style={{ marginTop: 8 }}
                        onPress={
                            this.props.type === 'update' ? 
                            this.handleUpdate : this.handleComment
                        }>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        addComment: (data) => dispatch(add(data)),
        updateComment : (data) => dispatch(update(data))
    }
}
export default connect(null, mapDispatch)(InputComments);