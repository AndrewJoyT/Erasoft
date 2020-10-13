import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
// redux
import { connect } from 'react-redux'
import { getUser } from '../models/User_models';
import { action } from '../config/Redux/Action/actionType';
// asycn storage
import AsyncStorage from '@react-native-community/async-storage';
// core component
import HeaderAuth from '../components/Layout/HeaderAuth';
import FooterAuth from '../components/Layout/FooterAuth';
class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }
    componentDidMount() {
        this.props.setNavigation(this.props.navigation);
        AsyncStorage.getItem('user', (err, result) => {
            if (result !== null) this.props.navigation.push('article')
        })
    }
    handleSignin = () => {
        const { email, password } = this.state
        //cek input user
        if (email === '' || password === '') {
            // input blm langkap
            alert("Input belum langkap!")
        } else {
            // input lengkap
            // cek email user
            this.props.getUser(email)
                .then((user) => {
                    if (!user) {
                        // email tidak terdaftar
                        alert("Email tidak terdaftar");
                    } else {
                        // email terdaftar
                        // cek password user
                        if (user.password !== password) {
                            // password salah
                            alert('Password salah!')
                        } else {
                            AsyncStorage.setItem('user', JSON.stringify(user))
                            this.props.navigation.push('article')
                        }
                    }
                })
        }
    }
    render() {
        return (
            <>
                <Container style={styles.container}>
                    <Content>
                        <HeaderAuth title="Sign In"
                            subTitle="Sudah punya akun? Tulis dan bagikan artikel terbaru mu dengan kami." />
                        <View style={styles.view_form}>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input onChangeText={
                                        (text) => this.setState({ email: text })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
                                    <Input secureTextEntry onChangeText={
                                        (text) => this.setState({ password: text })} />
                                </Item>
                                <Button primary style={styles.btn_form}
                                    onPress={this.handleSignin}>
                                    <Text> Sign In </Text>
                                </Button>
                            </Form>
                            <FooterAuth text="Don't have account? " auth="login"
                                text_link="Sign Up here" />
                        </View>
                    </Content>
                </Container>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return {
        getUser: (email) => dispatch(getUser(email)),
        setNavigation: (nav) => dispatch({ type: action.navigation, value: nav })
    }
}
export default connect(null, mapDispatch)(Login)
const styles = StyleSheet.create({
    container: {
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
    },
})