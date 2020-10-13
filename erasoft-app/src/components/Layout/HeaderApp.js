import React, { Component } from "react";
import { Header, Left,Button,Icon, Title } from "native-base";

class HeaderApp extends Component {
    render() {
        return (
            <Header style={{ alignItems: "center" }}>
                <Title >{this.props.title}</Title>
            </Header>
        );
    }
}

export default HeaderApp