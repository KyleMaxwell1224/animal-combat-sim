import {Container, Link} from '@material-ui/core';
import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';

class ErrorView extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container
          maxWidth = "false"
          style = {{textAlign: 'center', padding: '0px'}}>
          <Navbar />
          <h1>Uh-oh, that wasn&apos;t supposed to happen.
              Want to return to the main page?</h1>
          <Link href = "/">Go Back Now</Link>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorView;
