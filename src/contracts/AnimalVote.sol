// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;


contract AnimalVote {
    string public name;
    uint public voteCount = 0;
    

    event VotePlaced(
        uint id,
        string winningAnimal,
        uint256 animalCount
    );

    struct Vote {
        uint id;                
        string winningAnimal;           // name of species
        uint256 animalCount;            // # of winning animals in fight
        address voter;                  // address of voter
    }

    mapping(uint => Vote) public votes;

    // Constructor function
    constructor () public {
        name = "The Fight That Matters";
    }

    function placeVote(string memory _winningAnimal, uint256 _animalCount) public {
        require(bytes(_winningAnimal).length > 0);
        // place the vote
        votes[voteCount] = Vote(voteCount, _winningAnimal, _animalCount, msg.sender);
        voteCount++;
        emit VotePlaced(voteCount, _winningAnimal, _animalCount);
    }

}