import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
export default class FooterTabsExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer>
          <FooterTab>
            <Button active>
              <Text>Profile</Text>
            </Button>
            <Button>
              <Text>Article</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}