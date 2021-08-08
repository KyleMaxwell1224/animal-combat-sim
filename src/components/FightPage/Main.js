import React, { Component } from 'react';
import GenerateMatchup from '../../services/GenerateMatchup.js';
import Container from '@material-ui/core/Container'
import AnimalBox from '../AnimalBox/AnimalBox';
import './Main.css';
import { Button } from '@material-ui/core';

class Main extends Component {
  constructor(props) {
    super(props);
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

  }
  
  setMatchupStates(myMatchup) {
    this.setState({ 
      animalOneName: myMatchup.animOne.animalName,
      animalTwoName: myMatchup.animTwo.animalName,
      animalOneCount: GenerateMatchup.generateNumberOfAnimals(),
      animalTwoCount: GenerateMatchup.generateNumberOfAnimals(),
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

  render() {
    return (
      <Container style = {{textAlign: "center"}} maxWidth = {false}>
        <h1>Ultimate Animal Matchup</h1>
        <h2>Don't like the matchup?</h2>
        <Button variant="contained" color = "primary" onClick = {this.refreshMatchup} >Refresh Matchup</Button>
        <Container style = {{display: "inline-flex"}} maxWidth = {false}>
          <AnimalBox placeVote = {this.props.placeVote} animalName = {this.state.animalOneName} animalCount = {this.state.animalOneCount} pictureLink = {this.state.animalOnePictureLink} />
          <h3>vs.</h3>
          <AnimalBox placeVote = {this.props.placeVote} animalName = {this.state.animalTwoName} animalCount = {this.state.animalOneCount} pictureLink = {this.state.animalTwoPictureLink} />
        </Container>
      </Container>
    );
  }
}

export default Main;