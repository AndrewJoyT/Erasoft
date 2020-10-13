import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class HeaderAuth extends React.Component {
    render() {
        return (
            <>
                <View style={styles.view_content}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.subTitle}> {this.props.subTitle} </Text>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    view_content: {
        padding: 24,
    },
    title: {
        marginTop: 24,
        fontSize: 36,
        fontWeight: "600",
        textAlign: "center",
    },
    subTitle: {
        textAlign: "center",
        marginTop: 16
    }
})