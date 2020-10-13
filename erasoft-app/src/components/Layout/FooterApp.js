import React from 'react'
import {Text, Button, Footer, FooterTab } from 'native-base';

class FooterApp extends React.Component {
    render() {
        return (
            <>
                <Footer>
                    <FooterTab>
                        <Button active={this.props.active} onPress={()=>this.props.navigation.push('article')}>
                            <Text>Article</Text>
                        </Button>
                        <Button active={this.props.active} onPress={() => this.props.navigation.push('formArticle', { form: 'add' })}>
                            <Text>Create</Text>
                        </Button>
                        <Button active={this.props.active} onPress={()=>this.props.navigation.push('profile')}>
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </>
        )
    }
}


export default FooterApp
