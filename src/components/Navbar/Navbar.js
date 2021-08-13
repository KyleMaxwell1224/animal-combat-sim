import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import './Navbar.css'
class Navbar extends Component {

    render() {
        return (
          <Container id = "navbar" maxWidth = {false} style = {{ display: "inline-flex"}}>
              <h1 className = "navText">Welcome to the Fantasy Animal Showdown</h1>
              <h2 className = "navText" style = {{ float: "right"}}>{this.props.account}</h2>
          </Container>
        );
    }
}

export default Navbar;