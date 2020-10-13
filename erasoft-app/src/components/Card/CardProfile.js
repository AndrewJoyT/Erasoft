import React, { Component } from "react";
import { Card, CardItem, Text, Body } from "native-base";
class CardProfile extends Component {
  render() {
    return (
          <Card>
            <CardItem header bordered>
              <Text>{this.props.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {this.props.value}
                </Text>
              </Body>
            </CardItem>
          </Card>
    );
  }
}
export default CardProfile