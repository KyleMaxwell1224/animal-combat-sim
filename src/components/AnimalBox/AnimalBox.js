import Container from "@material-ui/core/Container";
import React from 'react';
import './AnimalBox.css';

function AnimalBox(props) {
    return (
        <Container className = "animalBox">
            <h1>{props.animalName}</h1>
            <img className = "animalImg" src= {props.pictureLink} alt = {props.animalName} /> 
        </Container>
    );
}

export default AnimalBox;