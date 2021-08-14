import React, { Component } from 'react';
import GenerateMatchup from '../../services/GenerateMatchup.js';
import Container from '@material-ui/core/Container'
import AnimalBox from '../AnimalBox/AnimalBox';
import './Main.css';
import { Button } from '@material-ui/core';

class Main extends Component {
  constructor(props) {
    super(props);
    console.log("ANIMAL VOTES IS : " +props.votes);
    this.state = {
      account: '',
      votes: null,
      voteCount: 0,
      animalOneName: '',
      animalTwoName: '',
      animalOneCount: 0,
      animalTwoCount: 0,
      animalOnePictureLink: '',
      animalTwoPictureLink: '',
      loading: true
    }
    this.refreshMatchup = this.refreshMatchup.bind(this);
    this.getVoteCount = this.getVoteCount.bind(this);
  }
  
  getVoteCount(num){
    this.setState({voteCount: parseInt(num) })
    console.log("STATE SET TO + "+num)
  }

  setMatchupStates(myMatchup) {
    this.setState({ 
      animalOneName: myMatchup.animOne.animalName,
      animalTwoName: myMatchup.animTwo.animalName,
      animalOneCount: myMatchup.animOne.animalCount,
      animalTwoCount: myMatchup.animTwo.animalCount,
      animalOnePictureLink: myMatchup.animOne.pictureLink,
      animalTwoPictureLink: myMatchup.animTwo.pictureLink
    });
  }

  componentDidMount() {
    var myMatchup = GenerateMatchup.generateTwoAnimalMatchup();
    this.setMatchupStates(myMatchup);
  }

  refreshMatchup() {
    var myMatchup = GenerateMatchup.generateTwoAnimalMatchup();
    this.setMatchupStates(myMatchup);
  }

  componentDidUpdate(prevProps, prevState) {
    if(parseInt(prevProps.votes) !== parseInt(this.state.voteCount)){
      this.getVoteCount(prevProps.votes);
    }
  }
  componentDidCatch(error, errorInfo) {
    console.log("ERROR! "+ errorInfo);
  } 

  render() {
    return (
      <Container style = {{textAlign: "center"}} maxWidth = {false}>
        <h1>Ultimate Animal Matchup</h1>
        <h2>Don't like the matchup?</h2>
        <Button variant="contained" style = {{margin: "1.5rem", padding: "1rem"}} color = "primary" onClick = {this.refreshMatchup} >Refresh Matchup</Button>
        <h3>Number of votes placed so far: {this.state.voteCount}</h3>
        <Container style = {{display: "inline-flex"}} maxWidth = {false}>
          <AnimalBox placeVote = {this.props.placeVote} animalName = {this.state.animalOneName} animalCount = {this.state.animalOneCount} pictureLink = {this.state.animalOnePictureLink} />
          <h3>vs.</h3>
          <AnimalBox placeVote = {this.props.placeVote} animalName = {this.state.animalTwoName} animalCount = {this.state.animalTwoCount} pictureLink = {this.state.animalTwoPictureLink} />
        </Container>
      </Container>
    );
  }
}

export default Main;