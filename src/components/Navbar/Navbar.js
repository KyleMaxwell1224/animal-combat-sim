import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import './Navbar.css';
import {Link} from '@material-ui/core';
class Navbar extends Component {
  render() {
    return (
      <Container id = "navbar" maxWidth = {false} >
        <Container>
          <h1 className = "navText"
            style = {{textAlign: 'left', float: 'left'}}>
              Welcome to the Fantasy Animal Showdown</h1>
          <h2 className = "navText"
            style = {{textAlign: 'right', float: 'right'}}>
              Account ID: {this.props.account ? this.props.account : 'NONE'}
          </h2>
        </Container>
        <Link
          className = "navLink"
          style = {{margin: '1rem'}}
          href = "/">Home</Link>
        <Link
          className = "navLink"
          style = {{margin: '1rem'}}
          href = "/info">Chain Info</Link>
      </Container>
    );
  }
}

export default Navbar;
