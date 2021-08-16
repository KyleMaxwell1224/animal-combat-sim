import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar/Navbar'
import AnimalVote from '../abis/AnimalVote.json'
import Main from './FightPage/Main'
import VoteComplete from './VoteComplete/VoteComplete';
import '@fontsource/roboto';
import Container from '@material-ui/core/Container';
import {
  Router, Route
} from "react-router-dom";
import ErrorView from './ErrorView/ErrorView';
import ChainInfoView from './ChainInfoView/ChainInfoView';
import History from '../helpers/History';


class App extends Component {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = AnimalVote.networks[networkId];
    const networkName = await web3.eth.net.getNetworkType();
    this.setState({ networkName });
    if(networkData) {
      const animalVote = new web3.eth.Contract(AnimalVote.abi, networkData.address)
      this.setState({ animalVote })
      const voteCount = await animalVote.methods.voteCount().call();
      this.setState({ voteCount })
      // Load votes
      for (var i = 1; i <= voteCount; i++) {
        const votes = await animalVote.methods.votes(i).call()
        this.setState({
          votes: [this.state.votes, votes]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('This contract is not deployed to detected network. Please change networks.')
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  constructor(props) {
    super(props);
    
    this.state = {
      account: '',
      votes: null,
      animalVote: null,
      voteCount: 0,
      estGas: 0.0,
      matchup: null,
      error: null,
      networkName: "Undetected",
      loading: true
    }
    this.placeVote = this.placeVote.bind(this);
  }
  
  placeVote(winningAnimal, animalCount) {
    console.log("PLACING VOTE " + animalCount)
    this.setState({ loading: true });
    try{
      this.state.animalVote.methods.placeVote(winningAnimal, animalCount).send({ from: this.state.account }, function (err, res) {
        if (err) {
          console.log("An error occured during transaction", err)
          return
        }
        History.push('/complete', {transactionId: res});
        
      });
    } catch(error){
      this.setState({ error });
    }
  
  };


  render() {
    if(this.state.error) {
      return <ErrorView />
    }
    return (
      <Container style={{padding:0}}  maxWidth = {false}>
        <Navbar account={this.state.account} />
        <Router history = {History}>
            <Route exact path="/">
            <Main
              placeVote={this.placeVote}
              votes={this.state.voteCount}
              />
            </Route>
            <Route path="/complete">
              <VoteComplete 
                networkName={this.state.networkName}
              />
            </Route>
            <Route path="/info">
              <ChainInfoView 
                networkName={this.state.networkName}
              />
            </Route>
        </Router>
       
      </Container>
    );
  }
}

export default App;
