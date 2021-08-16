const AnimalVote = artifacts.require('../src/contracts/AnimalVote.sol');

require('chai')
  .use(require('chai-as-promised'))
  .should()


  contract('AnimalVote', ([deployer, author, tipper]) => {
    let animalVote
    const fakeMatchup = {
        id: 1, 
        animalOne: "Shark", 
        animalOneCount: 2, 
        animalOnePictureLink: "test.com",
        animalTwo: "tiger", 
        animalTwoCount: 3, 
        animalTwoPictureLink: "test2.com"
    }

  before(async () => {
    animalVote = await AnimalVote.deployed()
  })
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await animalVote.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await animalVote.name()
      assert.equal(name, 'The Fight That Matters')
    })
  })
  describe('votes', async () => {
    let result, voteCount

    before(async () => {
      result = await animalVote.placeVote('Shark', 2)
      voteCount = await animalVote.voteCount()
    })

    it('places vote', async () => {
      // SUCESS
      assert.equal(voteCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), voteCount.toNumber(), 'id is correct')
      assert.equal(event.winningAnimal, 'Shark', 'content is correct')
      // FAILURE: Post must have content
      await animalVote.placeVote('', fakeMatchup).should.be.rejected;
     })
  })
})
