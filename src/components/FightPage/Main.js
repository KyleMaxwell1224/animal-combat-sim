import React, { Component } from 'react';
import GenerateMatchup from '../../services/GenerateMatchup.js';
import Container from '@material-ui/core/Container'
import AnimalBox from '../AnimalBox/AnimalBox';
import './Main.css';

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
  }
  

  componentDidMount() {
    var myMatchup = GenerateMatchup.generateTwoAnimalMatchup();
    console.log("anim one: " +myMatchup.animOne.animalName);

    console.log("anim two: " +myMatchup.animTwo.animalName);
    this.setState({ 
      animalOneName: myMatchup.animOne.animalName,
      animalTwoName: myMatchup.animTwo.animalName,
      animalOneCount: GenerateMatchup.generateNumberOfAnimals(),
      animalTwoCount: GenerateMatchup.generateNumberOfAnimals(),
      animalOnePictureLink: myMatchup.animOne.pictureLink,
      animalTwoPictureLink: myMatchup.animTwo.pictureLink
    });

  }
  render() {
    return (
      <Container maxWidth = "false">
        <h1 style = {{textAlign: "center"}}>Ultimate Animal Matchup</h1>
        <Container style = {{display: "inline-flex"}} maxWidth = "false">
          <AnimalBox animalName = {this.state.animalOneName} pictureLink = {this.state.animalOnePictureLink} />
          <h3>vs.</h3>
          <AnimalBox animalName = {this.state.animalTwoName} pictureLink = {this.state.animalTwoPictureLink} />
        </Container>
      </Container>
    );
  }
}

export default Main;