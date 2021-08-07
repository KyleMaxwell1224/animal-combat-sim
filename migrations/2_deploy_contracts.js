var AnimalVote = artifacts.require("./AnimalVote.sol");

module.exports = function(deployer) {
  deployer.deploy(AnimalVote);
};