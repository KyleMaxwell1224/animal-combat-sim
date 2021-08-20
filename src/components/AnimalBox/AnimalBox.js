import {Button, Container} from '@material-ui/core';
import React from 'react';
import './AnimalBox.css';

AnimalBox.propTypes = {
  name: PropTypes.string.isRequired,
};

class AnimalBox extends React.Component {
  placeVote() {
    this.props.placeVote(this.props.animalName, this.props.animalCount);
  };


  render() {
    return (
      <Container className = "animalBox">
        <h1>{this.props.animalCount} {this.props.animalName}s</h1>
        <img
          className = "animalImg"
          src= {this.props.pictureLink}
          alt = {this.props.animalName}
        />
        <br/>
        <Button
          onClick = {() => this.placeVote()}
          color = "primary"
          variant = "contained">
                Vote {this.props.animalName}!
        </Button>
      </Container>
    );
  }
}

export default AnimalBox;
