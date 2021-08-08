import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Container from '@material-ui/core/Container';
import './Navbar.css'
class Navbar extends Component {

    render() {
        return (
          <Container id = "navbar" maxWidth = {false}>
            <a
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dapp University
            </a>
            <ul style ={{float: 'right'}}>
              <li >
                <small className="text-secondary">
                  <small id="account">{this.props.account}</small>
                </small>
                { this.props.account
                  ? <img alt = "identicon"
                    width='30'
                    height='30'
                    src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                  />
                  : <span></span>
                }
              </li>
            </ul>
          </Container>
        );
    }
}

export default Navbar;