import { Container } from "@material-ui/core";
import React, { Component } from 'react';

class ChainInfoView extends Component {

    render() {
        return (
            <Container maxWidth = {false} style = {{textAlign: "center"}} >
                <h1>Currently on {this.props.networkName} network.</h1>
            </Container>
        );
    }
}   

export default ChainInfoView;