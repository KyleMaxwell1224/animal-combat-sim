import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import './Navbar.css'
class Navbar extends Component {

    render() {
        return (
          <Container id = "navbar" maxWidth = {false} style = {{ display: "inline-block"}}>
              <h1 className = "navText" style = {{textAlign: "left", float: "left"}}>Welcome to the Fantasy Animal Showdown</h1>
              <h2 className = "navText" style = {{ textAlign: "right", float: "right"}}>Account ID: {this.props.account}</h2>
          </Container>
        );
    }
}

export default Navbar;