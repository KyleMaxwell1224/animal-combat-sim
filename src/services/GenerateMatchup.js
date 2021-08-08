import animalData from "../AnimalList.json";

const max = 5;
const min = 1;

const GenerateMatchup = {
    // Tester function to ensure json is being properly read.
    getData () {
        console.log(animalData);
    },
    // Function to generate random number from 1-5 (inclusive)
    generateNumberOfAnimals() {
        return Math.floor(Math.random() * (max - min) + min);
    },
    generateAnimal() {
        var index = Math.floor(Math.random() * animalData.length)
        return animalData[index];
    },
    generateTwoAnimalMatchup() {
        var animOne = this.generateAnimal();
        var animTwo = this.generateAnimal();
        var arr = { animOne, animTwo };
        console.log("BOUTTA return " + arr.animOne.animalName)
        console.log("BOUTTA return " + arr.animTwo.animalName)
        return arr;
    }
};

export default GenerateMatchup;