import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar/Navbar'
import AnimalVote from '../abis/AnimalVote.json'
import Main from './FightPage/Main'
import '@fontsource/roboto';
import Container from '@material-ui/core/Container';
class App extends Component {

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = AnimalVote.networks[networkId]
    if(networkData) {
      const animalVote = web3.eth.Contract(AnimalVote.abi, networkData.address)
      this.setState({ animalVote })
      const postCount = await animalVote.methods.voteCount().call()
      this.setState({ postCount })
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const votes = await animalVote.methods.votes(i).call()
        this.setState({
          votes: [...this.state.votes, votes]
        })
      }
      this.setState({ loading: false})

    } else {
      window.alert('AnimalVote contract not deployed to detected network.')
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
      matchup: null,
      loading: true
    }
    this.placeVote = this.placeVote.bind(this)
  }
  
  placeVote(winningAnimal) {
    this.setState({ loading: true })
    this.state.animalVote.methods.placeVote(winningAnimal, this.state.matchup).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    
  };

  render() {
    return (
      <Container style={{padding:0}}  maxWidth = "false">
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader"><p>Loading...</p></div>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
            />
        }
      </Container>
    );
  }
}

export default App;