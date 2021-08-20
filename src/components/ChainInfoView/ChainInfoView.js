import {Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow} from '@material-ui/core';
import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import './ChainInfoView.css';
import animalData from '../../AnimalList.json';

class ChainInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastVotes: this.props.pastVotes,
      topAnimalName: 'Unknown',
      topAnimalPic: '',
      topAnimalVotes: 0,
      voteCountByAnimal: [],
    };
    this.countAnimalVictories = this.countAnimalVictories.bind(this);
  }

  sortMap(oldMap) {
    const sortedMap = new Map([...oldMap.entries()].sort(
        (a, b) => b[1] - a[1]));
    return sortedMap;
  }

  countAnimalVictories(pastVotes) {
    const animalMap = new Map();
    for (let animal = 0; animal < pastVotes.length; animal++) {
      const animalName = pastVotes[animal].returnValues.winningAnimal;
      if (!animalMap.has(animalName)) {
        animalMap.set(animalName, 1);
      } else {
        animalMap.set(animalName, animalMap.get(animalName)+1);
      }
    }
    return animalMap;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pastVotes !== this.state.pastVotes) {
      let animalMap = this.countAnimalVictories(prevProps.pastVotes);
      animalMap = this.sortMap(animalMap);
      const topAnimal = [...animalMap.entries()].reduce(
          (a, e ) => e[1] > a[1] ? e : a);
      const foundAnimal = animalData.find(
          (animal) => animal.animalName === topAnimal[0]);
      this.setState({topAnimalPic: foundAnimal.pictureLink});
      this.setState({topAnimalVotes: topAnimal[1]});
      this.setState({topAnimalName: foundAnimal.animalName});
      this.setState({pastVotes: prevProps.pastVotes});
      this.setState({voteCountByAnimal: Array.from(animalMap)});
    }
  }

  render() {
    return (
      <Container
        id="info-box"
        maxWidth = {false}
        style = {{textAlign: 'center'}}
      >
        <h1>Currently on {this.props.networkName} network.</h1>
        <h2>The top animal on this chain is a {this.state.topAnimalName}
            with {this.state.topAnimalVotes} votes!</h2>
        <Image
          src={this.state.topAnimalPic}
          style={{width: '20rem', borderStyle: 'solid',
            borderColor: 'black', margin: '1rem'}} roundedCircle />
        <p>The rest of the food chain is as follow: </p>
        <TableContainer style = {{width: '80%'}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Animal Name </ TableCell>
                <TableCell align="right">Votes</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.voteCountByAnimal.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default ChainInfoView;
