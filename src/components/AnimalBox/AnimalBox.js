import { Button, Container } from "@material-ui/core";
import React from 'react';
import './AnimalBox.css';

class AnimalBox extends React.Component {
    
  
    placeVote() {
        this.props.placeVote(this.props.animalName, this.props.animalCount);
  /*    AnimalVote.methods.placeVote(this.props.animalName, this.props.animalCount).send({ from: this.props.account })
        this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
        .once('receipt', (receipt) => {
            this.setState({ loading: false })
    }) */
};
render () {
    return (
        <Container className = "animalBox">
            <h1>{this.props.animalName}</h1>
            <img className = "animalImg" src= {this.props.pictureLink} alt = {this.props.animalName} /> 
            <br/>
            <Button onClick = {() => this.placeVote()} color = "primary" variant = "contained">Vote {this.props.animalName}!</Button>
        </Container>
        );
    }
}

export default AnimalBox;