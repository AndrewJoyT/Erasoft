import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
// redux
import { connect } from 'react-redux';
import { add } from '../models/User_models';
// core component
import HeaderAuth from '../components/Layout/HeaderAuth';
import FooterAuth from '../components/Layout/FooterAuth';
class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }
    handleSignup = () => {
        const { name, email, password } = this.state
        //cek input user
        if (name === '' || email === '' || password === '') {
            // input blm langkap
            alert("Input belum langkap!")
        } else {
            // input lengkap
            // cek email user
            this.props.addUser({name,email,password})
            .then((res)=>{ if(res) this.props.navigation.push('login') })
        }
    }
    render() {
        return (
            <>
                <Container style={styles.container}>
                    <Content>
                        <HeaderAuth title="Sign Up" 
                            subTitle="Belum punya akun? Daftarkan segera dan buat artikel terbaru mu."/>
                        <View style={styles.view_form}>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Full Name</Label>
                                    <Input textContentType="nickname" onChangeText={
                                        (text) => this.setState({ name: text })} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input onChangeText={
                                        (text) => this.setState({ email: text })}/>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Password</Label>
                                    <Input secureTextEntry onChangeText={
                                        (text) => this.setState({ password: text })} />
                                </Item>
                                <Button primary style={styles.btn_form}
                                    onPress={this.handleSignup}> 
                                    <Text> Sign Up </Text>
                                </Button>
                            </Form>
                            <FooterAuth text="Done have account? " auth="register"
                                text_link="Sign In here" />
                        </View>
                    </Content>
                </Container>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return { addUser: (data) => dispatch(add(data)) }
}
export default connect(null, mapDispatch)(Register)
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    view_form: {
        paddingHorizontal: 24,
        marginTop: 16,
    },
    btn_form: {
        marginTop: 16,
        alignSelf: "center"
    }
})