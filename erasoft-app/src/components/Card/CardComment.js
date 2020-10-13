import { Card, CardItem, Text, Button, Left, Body, Right } from 'native-base';
import React from 'react';
import {connect} from 'react-redux';
import { remove } from '../../models/Comment_models';
import InputComments from '../Form/InputComment';
class CardComment extends React.Component {
    state = {
        input:false
    }
    handleDelete = () =>{
        const comment = this.props.comment
        this.props.removeComment(comment.data.id)
        .then(res=>{
            console.log(res)
            this.props.navigation.push('detailArticle',{id:comment.data.article_id})
        })
    }
    render() {
        const { comment } = this.props
        return (
            <>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{comment.user}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem >
                        <Left>
                            <Body>
                                <Text>
                                    {comment.data.text}
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    {
                        this.props.user === comment.user_id ?
                            <CardItem>
                                <Left>
                                    <Button transparent 
                                    onPress={()=>this.setState({input:true})}>
                                        <Text>Edit</Text>
                                    </Button>
                                </Left>
                                <Right>
                                    <Button transparent onPress={this.handleDelete}>
                                        <Text>Delete</Text>
                                    </Button>
                                </Right>
                            </CardItem> : null
                    }
                </Card>
                {
                    this.state.input ?
                        <InputComments
                            type="update"
                            id={comment.data.id}
                            article_id={comment.data.article_id}
                            value={comment.data.text}
                            navigation={this.props.navigation} /> : null
                }
            </>
        )
    }
}

const mapDispatch = (dispatch) => {
    return{
        removeComment : (id) => dispatch(remove(id))
    }
}
export default connect(null,mapDispatch)(CardComment);