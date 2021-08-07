pragma experimental ABIEncoderV2;

//idea
//create a list of animals and pictures.
//generate random num, display pics related to num
//user picks winner
contract AnimalVote {
    string public name;
    uint public voteCount = 0;


    event VotePlaced(
        uint id,
        string winningAnimal,
        Matchup matchup
    );

    struct Matchup {
        uint id;
        string animalOne;
        uint animalOneCount;
        string animalOnePictureLink;
        string animalTwo;
        uint animalTwoCount;
        string animalTwoPictureLink;
    }


    struct Vote {
        uint id;
        string winningAnimal;
        Matchup matchup;
    }    

    mapping(uint => Vote) public votes;
    mapping(uint => Matchup) public matchups;

    // Constructor function
    constructor () public {
        name = "The Fight That Matters";
    }

    function placeVote(string memory _winningAnimal, Matchup memory matchup) public {
        require(bytes(_winningAnimal).length > 0);
        voteCount++;
        // Create the post
        votes[voteCount] = Vote(voteCount, _winningAnimal, matchup);
        emit VotePlaced(voteCount, _winningAnimal, matchup);
    }

}