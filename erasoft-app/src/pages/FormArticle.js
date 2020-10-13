import React, { Component } from 'react';
import { Container, Input, Item, Form, Textarea, Text, Label, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { add, getArticle, update } from '../models/Article_models';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
class FormArticle extends Component {

    state = {
        title: "",
        content: "",
        article: {},
        user: {}
    }
    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({ user: JSON.parse(result) })
        })
        const { id } = this.props.route.params;
        this.props.getArticle(id, null)
            .then((res) => {
                this.setState({
                    title: res.title,
                    content: res.content,
                    article: res
                })
            })
    }
    handleCreate = () => {
        const { title, content } = this.state
        if (content === '' || title === '') {
            alert('Data tidak boleh kosong')
        } else {
            this.props.addArticle({
                title: title,
                content: content,
                user_id: this.state.user.id
            })
                .then(res => {
                    this.props.navigation.push('article')
                })
        }
    }
    handleEdit = () => {
        const { id } = this.props.route.params;
        this.props.updateArticle({
            id:id,
            title:this.state.title,
            content:this.state.content,
            views:this.state.article.views,
            comments:this.state.article.comments
        })
        .then(res=>{
            this.props.navigation.push('profile')
        })
    }

    render() {
        const { form } = this.props.route.params;
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>
                    {
                        form === 'add' ? "Create Article" : "Edit Article"
                    }
                </Text>
                <Form>
                    <Label style={styles.label}>Title</Label>
                    <Item regular>
                        <Input placeholder='title'
                            value={this.state.title}
                            onChangeText={(text) => this.setState({ title: text })} />
                    </Item>
                    <Label style={styles.label}>Content</Label>
                    <Textarea rowSpan={5} bordered placeholder="Textarea" onChangeText={(text) => this.setState({ content: text })}
                        value={this.state.content} />
                    <Button block primary style={styles.btn_create}
                        onPress={
                            form === "add" ?
                                this.handleCreate :
                                this.handleEdit
                        } >
                        <Text>
                            {
                                form === 'add' ? "Create" : "Edit"
                            }
                        </Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        getArticle: (id, user_id) => dispatch(getArticle(id, user_id)),
        addArticle: (data) => dispatch(add(data)),
        updateArticle: (data) => dispatch(update(data))
    }
}
export default connect(null, mapDispatch)(FormArticle)

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginVertical: 12
    },
    label: {
        marginVertical: 6
    },
    btn_create: {
        marginTop: 12
    }
})