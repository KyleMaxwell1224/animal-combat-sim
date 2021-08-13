import animalData from "../AnimalList.json";

//DEFAULTS FOR LOW FRAGILITY
var max = 5;
var min = 2;

//
const GenerateMatchup = {
    // Tester function to ensure json is being properly read.
    getData () {
        console.log(animalData);
    },
    setMaxAndMinOnFragility(animal) {
        switch(animal.fragility) {
            //TODO: THESE VALUES ARE HARDCODED. ADD TO ENUMS FILE
            case "LOW":
                max = 5;
                min = 2;
                break;
            case "MEDIUM":
                max = 24;
                min = 12;
                break;
            case "HIGH":
                min = 50;
                max = 100;
                return;
            default:
                return;
        }
    },
    // Function to generate random number from 1numOfAnimals-5 (inclusive)
    generateNumberOfAnimals(animal) {
        console.log("SETTING MAX AND MIN")
        this.setMaxAndMinOnFragility(animal)
        console.log("max set to " + max)
        return Math.floor(Math.random() * (max - min) + min);
    },
    generateAnimal() {
        var index = Math.floor(Math.random() * animalData.length);
        var numOfAnimals = this.generateNumberOfAnimals(animalData[index]);
        animalData[index].animalCount = numOfAnimals;
        return animalData[index];
    },
    generateTwoAnimalMatchup() {
        var animOne = this.generateAnimal();
        var animTwo = this.generateAnimal();
        var arr = { animOne, animTwo };
        console.log("BOUTTA return " + arr.animOne.animalName + " WITH A COUNT OF " + arr.animOne.animalCount)
        console.log("BOUTTA return " + arr.animTwo.animalName+ " WITH A COUNT OF " + arr.animTwo.animalCount)
        return arr;
    }
};

export default GenerateMatchup;