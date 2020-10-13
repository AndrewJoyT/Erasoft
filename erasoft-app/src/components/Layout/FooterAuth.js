import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
// redux
import { connect } from 'react-redux';
class FooterAuth extends React.Component {
    render() {
        return (
            <>
                <Text style={styles.subTitle}>
                    {this.props.text}
                    <Text style={styles.text_link}
                        onPress={ this.props.auth === 'login' ? 
                            () => this.props.navigation.push('register') :
                            () => this.props.navigation.push('login') 
                        }>{this.props.text_link}</Text>
                </Text>
            </>
        )
    }
}
const mapState = (state) => {
    return { navigation: state.navigation }
}
export default connect(mapState, null)(FooterAuth)
const styles = StyleSheet.create({
    subTitle: {
        textAlign: "center",
        marginTop: 16
    },
    text_link: {
        color: "blue",
    },
})