import animalData from "../AnimalList.json";
import FragilityMaxsAndMins from '../Enums.js';
//DEFAULTS FOR LOW FRAGILITY
var max = FragilityMaxsAndMins.maxLowFragility;
var min = FragilityMaxsAndMins.minLowFragility;

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
                max = FragilityMaxsAndMins.maxLowFragility;
                min = FragilityMaxsAndMins.minLowFragility;
                break;
            case "MEDIUM":
                max = FragilityMaxsAndMins.maxMediumFragility;
                min = FragilityMaxsAndMins.minMediumFragility;
                break;
            case "HIGH":
                max = FragilityMaxsAndMins.maxHighFragility;
                min = FragilityMaxsAndMins.minHighFragility;
                return;
            default:
                return;
        }
    },
    // Function to generate random number from min numOfAnimals thru max (inclusive)
    generateNumberOfAnimals(animal) {
        this.setMaxAndMinOnFragility(animal);
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
        return arr;
    }
};

export default GenerateMatchup;