import { Container, Link } from "@material-ui/core";
import './VoteComplete.css';
import React, { Component } from 'react';
import History from "../../helpers/History";

class VoteComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionId: History.location.state.transactionId,
    } 
    
  }



    render() {
      return (
        <Container maxWidth = {false} id = "main-content">
            <h2>Vote Complete!</h2>
            <h3>Transaction ID: { this.state.transactionId } </h3>
            <h3>View transaction 
              <a href={"https://" +this.props.networkName + ".etherscan.io/tx/" + this.state.transactionId} target = "_blank"> here </a>
            </h3>
        </Container>
      )
    }
  }
  
  export default VoteComplete;